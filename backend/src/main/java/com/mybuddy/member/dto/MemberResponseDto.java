package com.mybuddy.member.dto;

import com.mybuddy.amenity.dto.AmenityMyPageResponse;
import com.mybuddy.member.entity.Member.DogGender;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberResponseDto {

    private String nickname;

    private String dogName;

    private DogGender dogGender;

    private String aboutMe;

    private Long followerNumber;

    private Long followeeNumber;

    private String profileUrl;

    private List<MyBulletinPostDto> myBulletinPostDtos;

    private List<AmenityMyPageResponse> myAmenityDtos;

    @Builder
    public MemberResponseDto(String nickname, String dogName, DogGender dogGender,
                             String aboutMe, Long followerNumber, Long followeeNumber, String profileUrl,
                             List<MyBulletinPostDto> myBulletinPostDtos, List<AmenityMyPageResponse> myAmenityDtos) {
        this.nickname = nickname;
        this.dogName = dogName;
        this.dogGender = dogGender;
        this.aboutMe = aboutMe;
        this.followerNumber = followerNumber;
        this.followeeNumber = followeeNumber;
        this.profileUrl = profileUrl;
        this.myBulletinPostDtos = myBulletinPostDtos;
        this.myAmenityDtos = myAmenityDtos;
    }
}
