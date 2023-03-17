package com.mybuddy.follow.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FollowResponseDto {

    private final Long memberId;

    private final String nickname;

    private final String dogName;

    private final String profileUrl;

    @Builder
    public FollowResponseDto(Long memberId, String nickname, String dogName, String profileUrl) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.dogName = dogName;
        this.profileUrl = profileUrl;
    }
}
