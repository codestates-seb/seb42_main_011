package com.mybuddy.member.mapper;

import com.mybuddy.amenity.dto.AmenityForMyPageResponseDto;
import com.mybuddy.bulletin_post.dto.BulletinPostForMyPageResponseDto;
import com.mybuddy.member.dto.*;
import com.mybuddy.member.entity.Member;

import java.util.Comparator;
import java.util.List;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberCreateDtoToMember(MemberCreateDto createDto);

    Member memberUpdateDtoToMember(MemberUpdateDto patchDto);

    default MemberResponseDto memberToMemberResponseDto(Member member) {
        if (member == null) {
            return null;
        }

        List<BulletinPostForMyPageResponseDto> bulletinPostForMyPageResponseDtos =
                member.getBulletinPosts().stream()
                        .map(bulletinPost -> BulletinPostForMyPageResponseDto.builder()
                                .bulletinPostId(bulletinPost.getBulletinPostId())
                                .photoUrl(bulletinPost.getPhotoUrl())
                                .build())
                        .sorted(Comparator.comparingLong(
                                BulletinPostForMyPageResponseDto::getBulletinPostId).reversed())
                        .collect(Collectors.toList());

        List<AmenityForMyPageResponseDto> amenityForMyPageResponseDtos =
                member.getBulletinPosts().stream()
                        .map(bulletinPost -> {
                            AmenityForMyPageResponseDto amenityForMyPageResponseDto =
                                    AmenityForMyPageResponseDto.builder()
                                            .amenityId(bulletinPost.getAmenity().getAmenityId())
                                            .amenityName(bulletinPost.getAmenity().getAmenityName())
                                            .address(bulletinPost.getAmenity().getAddress())
                                            .photoUrl(bulletinPost.getPhotoUrl())
                                            .postCreatedAt(bulletinPost.getCreatedAt())
                                            .build();
                            return amenityForMyPageResponseDto;
                        })
                        .collect(Collectors.toMap(AmenityForMyPageResponseDto::getAmenityId,
                                Function.identity(), BinaryOperator.maxBy(Comparator.comparing(
                                        AmenityForMyPageResponseDto::getPostCreatedAt))))
                        .values()
                        .stream()
                        .sorted(Comparator.comparingLong(
                                AmenityForMyPageResponseDto::getAmenityId).reversed())
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
                .bulletinPostForMyPageResponseDtos(bulletinPostForMyPageResponseDtos)
                .amenityForMyPageResponseDtos(amenityForMyPageResponseDtos)
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
