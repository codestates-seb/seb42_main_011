package com.mybuddy.search.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class SearchMemberResponseDto {

    private final Long memberId;
    private final String profileUrl;
    private final String nickname;
    private final String dogName;
    private final long followerNumber;
    private final long followeeNumber;

    @Builder
    public SearchMemberResponseDto(Long memberId, String profileUrl, String nickname, String dogName, long followerNumber, long followeeNumber) {
        this.memberId = memberId;
        this.profileUrl = profileUrl;
        this.nickname = nickname;
        this.dogName = dogName;
        this.followerNumber = followerNumber;
        this.followeeNumber = followeeNumber;
    }

}
