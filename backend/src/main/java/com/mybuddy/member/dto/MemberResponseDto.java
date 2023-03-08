package com.mybuddy.member.dto;

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

    private String photoUrl;

    private List<MyBulletinPostDto> myBulletinPostDtos;

    private List<MyAmenityDto> myAmenityDtos;

    @Builder
    public MemberResponseDto(String nickname, String dogName, DogGender dogGender,
                             String aboutMe, Long followerNumber, Long followeeNumber, String photoUrl,
                             List<MyBulletinPostDto> myBulletinPostDtos, List<MyAmenityDto> myAmenityDtos) {
        this.nickname = nickname;
        this.dogName = dogName;
        this.dogGender = dogGender;
        this.aboutMe = aboutMe;
        this.followerNumber = followerNumber;
        this.followeeNumber = followeeNumber;
        this.photoUrl = photoUrl;
        this.myBulletinPostDtos = myBulletinPostDtos;
        this.myAmenityDtos = myAmenityDtos;
    }
}
