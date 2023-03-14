package com.mybuddy.follow.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FollowResponseDto {

    private Long memberId;

    private String nickname;

    private String dogName;

    private String profileUrl;

    @Builder
    public FollowResponseDto(Long memberId, String nickname, String dogName, String profileUrl) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.dogName = dogName;
        this.profileUrl = profileUrl;
    }
}
