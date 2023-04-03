package com.mybuddy.member.dto;

import com.mybuddy.amenity.dto.AmenityForMyPageResponseDto;
import com.mybuddy.bulletin_post.dto.BulletinPostForMyPageResponseDto;
import com.mybuddy.member.entity.Member.DogGender;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberResponseDto {

    private final String nickname;

    private final String dogName;

    private final DogGender dogGender;

    private final String aboutMe;
    private final int followByUser;

    private final Long followerNumber;

    private final Long followeeNumber;

    private final String profileUrl;

    private final List<BulletinPostForMyPageResponseDto> bulletinPostForMyPageResponseDtos;

    private final List<AmenityForMyPageResponseDto> amenityForMyPageResponseDtos;

    @Builder
    public MemberResponseDto(String nickname, String dogName, DogGender dogGender,
                             String aboutMe, int followByUser, Long followerNumber, Long followeeNumber, String profileUrl,
                             List<BulletinPostForMyPageResponseDto> bulletinPostForMyPageResponseDtos, List<AmenityForMyPageResponseDto> amenityForMyPageResponseDtos) {
        this.nickname = nickname;
        this.dogName = dogName;
        this.dogGender = dogGender;
        this.aboutMe = aboutMe;
        this.followByUser = followByUser;
        this.followerNumber = followerNumber;
        this.followeeNumber = followeeNumber;
        this.profileUrl = profileUrl;
        this.bulletinPostForMyPageResponseDtos = bulletinPostForMyPageResponseDtos;
        this.amenityForMyPageResponseDtos = amenityForMyPageResponseDtos;
    }
}
