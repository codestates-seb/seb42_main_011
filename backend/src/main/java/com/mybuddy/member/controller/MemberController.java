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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
@Validated
@CrossOrigin
public class MemberController {

    private final String MEMBER_DEFAULT_URL = "/api/v1/members";

    private final MemberService memberService;

    private final MemberMapper mapper;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ApiSingleResponse> postMember(@Valid @RequestPart MemberCreateDto createDto,
                                                        @RequestPart(required = false) MultipartFile profileImage) {
        Member member = memberService.createMember(mapper.memberCreateDtoToMember(createDto), profileImage);

        URI location = UriMaker.getUri(MEMBER_DEFAULT_URL, member.getMemberId());
        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.CREATED, "회원이 생성되었습니다.");

        return ResponseEntity.created(location).body(response);
    }

    @PatchMapping(value = "/{member-id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<ApiSingleResponse> patchMember(@Valid @RequestPart MemberPatchDto patchDto,
                                                         @RequestPart(required = false) MultipartFile profileImage,
                                                         @Positive @PathVariable("member-id") Long memberId) {
        Member member = mapper.memberPatchDtoToMember(patchDto);
        member.setMemberId(memberId);
        memberService.updateMember(member, profileImage);
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
