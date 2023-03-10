package com.mybuddy.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberListResponseDto {

    private String nickname;

    private String dogName;

    private Long followerNumber;

    private Long followeeNumber;

    private String profileUrl;

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
