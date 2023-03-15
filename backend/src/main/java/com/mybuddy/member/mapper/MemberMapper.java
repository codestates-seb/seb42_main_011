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

        /**
         * 연관 관계 매핑은 memberId를 중심으로 연결되므로 followerNumber를 count할 경우
         * 본인을 follow하는 사람들의 수가 아니라 본인이 follower로서 따르는 회원의 수가 된다.
         * 그러므로 MemberMapper에서는 follower와 followee의 수를 반대로 입력해야 한다.
         */
        Long numberOfUserAsFollower = (long) member.getFollowers().size();
        Long numberOfUserAsFollowee = (long) member.getFollowees().size();

        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
                .nickname(member.getNickname())
                .dogName(member.getDogName())
                .dogGender(member.getDogGender())
                .aboutMe(member.getAboutMe())
                .followerNumber(numberOfUserAsFollowee)
                .followeeNumber(numberOfUserAsFollower)
                .profileUrl(member.getProfileUrl())
                .myBulletinPostDtos(myBulletinPostDtos)
                .myAmenityDtos(myAmenityDtos)
                .build();

        return memberResponseDto;
    }

    @Named("MTMLR")
    default MemberListResponseDto memberToMemberListResponseDto(Member member) {
        if (member == null) {
            return null;
        }

        /**
         * 연관 관계 매핑은 memberId를 중심으로 연결되므로 followerNumber를 count할 경우
         * 본인을 follow하는 사람들의 수가 아니라 본인이 follower로서 따르는 회원의 수가 된다.
         * 그러므로 MemberMapper에서는 follower와 followee의 수를 반대로 입력해야 한다.
         */
        Long numberOfUserAsFollower = (long) member.getFollowers().size();
        Long numberOfUserAsFollowee = (long) member.getFollowees().size();

        MemberListResponseDto memberListResponseDto = MemberListResponseDto.builder()
                .nickname(member.getNickname())
                .dogName(member.getDogName())
                .followerNumber(numberOfUserAsFollowee)
                .followeeNumber(numberOfUserAsFollower)
                .profileUrl(member.getProfileUrl())
                .build();

        return memberListResponseDto;
    }

    @IterableMapping(qualifiedByName = "MTMLR")
    List<MemberListResponseDto> membersToMemberListResponseDtos(List<Member> members);
}
