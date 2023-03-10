package com.mybuddy.member.mapper;

import com.mybuddy.member.dto.*;
import com.mybuddy.member.entity.Member;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberCreateDtoToMember(MemberCreateDto createDto);

    Member memberPatchDtoToMember(MemberPatchDto patchDto);

    default MemberResponseDto memberToMemberResponseDto(Member member) {
        if (member == null) {
            return null;
        }

        List<MyBulletinPostDto> myBulletinPostDtos = member.getBulletinPosts().stream()
                .map(bulletinPost -> MyBulletinPostDto.builder()
                        .bulletinPostId(bulletinPost.getBulletinPostId())
                        .photoUrl(bulletinPost.getPhotoUrl())
                        .build())
                .collect(Collectors.toList());

        List<MyAmenityDto> myAmenityDtos = member.getBulletinPosts().stream()
                .map(bulletinPost -> bulletinPost.getAmenity())
                .map(amenity -> MyAmenityDto.builder()
                        .amenityId(amenity.getAmenityId())
                        .amenityName(amenity.getAmenityName())
                        .address(amenity.getAddress())
                        .photoUrl(null) // Amenity에 photoUrl 추가 필요.
                        .build())
                .collect(Collectors.toList());

        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
                .nickname(member.getNickname())
                .dogName(member.getDogName())
                .dogGender(member.getDogGender())
                .aboutMe(member.getAboutMe())
                .followerNumber(null)
                .followeeNumber(null)
                .profileUrl(member.getProfileUrl())
                .myBulletinPostDtos(myBulletinPostDtos)
                .myAmenityDtos(myAmenityDtos)
                .build();

        return memberResponseDto;
    }

    @Named("MTMLR")
    MemberListResponseDto memberToMemberListResponseDto(Member member);

    @IterableMapping(qualifiedByName = "MTMLR")
    List<MemberListResponseDto> membersToMemberListResponseDtos(List<Member> members);
}
