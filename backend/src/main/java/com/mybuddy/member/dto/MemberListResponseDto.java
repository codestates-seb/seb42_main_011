package com.mybuddy.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberListResponseDto {

    private final String nickname;

    private final String dogName;

    private final Long followerNumber;

    private final Long followeeNumber;

    private final String profileUrl;

    @Builder
    public MemberListResponseDto(String nickname, String dogName, Long followerNumber,
        Long followeeNumber, String profileUrl) {
        this.nickname = nickname;
        this.dogName = dogName;
        this.followerNumber = followerNumber;
        this.followeeNumber = followeeNumber;
        this.profileUrl = profileUrl;
    }
}
