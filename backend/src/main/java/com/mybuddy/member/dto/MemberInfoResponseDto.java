package com.mybuddy.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberInfoResponseDto {

    private final Long memberId;

    private final String nickname;

    private final String dogName;

    private final String profileUrl;

    @Builder
    public MemberInfoResponseDto(Long memberId, String nickname, String dogName, String profileUrl) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.dogName = dogName;
        this.profileUrl = profileUrl;
    }
}
