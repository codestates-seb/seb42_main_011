package com.mybuddy.member.mapper;

import com.mybuddy.member.dto.MemberListResponseDto;
import com.mybuddy.member.dto.MemberPatchDto;
import com.mybuddy.member.dto.MemberPostDto;
import com.mybuddy.member.dto.MemberResponseDto;
import com.mybuddy.member.entity.Member;
import java.util.List;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostDtoToMember(MemberPostDto postDto);

    Member memberPatchDtoToMember(MemberPatchDto patchDto);

    // @Mapping(source = "", target = "") : Mapping은 연관 관계 매핑 후 설정 예정.
    MemberResponseDto memberToMemberResponseDto(Member member);

    @Named("MTMLR")
    MemberListResponseDto memberToMemberListResponseDto(Member member);

    @IterableMapping(qualifiedByName = "MTMLR")
    List<MemberListResponseDto> membersToMemberListResponseDtos(List<Member> members);
}
