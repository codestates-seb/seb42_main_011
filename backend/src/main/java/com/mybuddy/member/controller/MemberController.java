package com.mybuddy.member.controller;

import com.mybuddy.global.utils.ApiSingleResponse;
import com.mybuddy.global.utils.UriMaker;
import com.mybuddy.member.dto.MemberPatchDto;
import com.mybuddy.member.dto.MemberCreateDto;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.mapper.MemberMapper;
import com.mybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@Validated
@CrossOrigin
public class MemberController {

    private final String MEMBER_DEFAULT_URL = "/members";

    private final MemberService memberService;

    private final MemberMapper mapper;

    @PostMapping // 첨부 파일 업로드 RequestPart는 추후 추가 예정.
    public ResponseEntity<ApiSingleResponse> postMember(@Valid @RequestBody MemberCreateDto postDto) {
        Member member = memberService.createMember(mapper.memberCreateDtoToMember(postDto));

        URI location = UriMaker.getUri(MEMBER_DEFAULT_URL, member.getMemberId());
        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.CREATED, "회원이 생성되었습니다.");

        return ResponseEntity.created(location).body(response);
    }

    @PatchMapping("/{member-id}") // 첨부 파일 업로드 RequestPart는 추후 추가 예정.
    public ResponseEntity<ApiSingleResponse> patchMember(@Valid @RequestBody MemberPatchDto patchDto,
                                                         @Positive @PathVariable("member-id") Long memberId) {
        Member member = mapper.memberPatchDtoToMember(patchDto);
        member.setMemberId(memberId);
        memberService.updateMember(member);
        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.OK, "회원 정보가 수정되었습니다.");

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity<ApiSingleResponse> getMember(@Positive @PathVariable("member-id") Long memberId) {
        return new ResponseEntity(new ApiSingleResponse<>(HttpStatus.OK, "회원 정보입니다.",
                mapper.memberToMemberResponseDto(memberService.getMember(memberId))), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<ApiSingleResponse> getMemberList() {
        return new ResponseEntity(new ApiSingleResponse<>(HttpStatus.OK, "전체 회원 정보입니다.",
                mapper.membersToMemberListResponseDtos(memberService.getMemberList())), HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@Positive @PathVariable("member-id") Long memberId) {
        memberService.deleteMember(memberId);

        return ResponseEntity.noContent().build();
    }
}
