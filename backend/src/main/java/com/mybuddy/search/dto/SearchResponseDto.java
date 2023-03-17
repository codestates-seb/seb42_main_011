package com.mybuddy.search.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SearchResponseDto {

    private Long memberId;
    private String profileUrl;
    private String nickname;
    private String dogName;
    private long followerNumber;
    private long followeeNumber;

    public SearchResponseDto(Long memberId, String profileUrl, String nickname, String dogName, long followerNumber, long followeeNumber) {
        this.memberId = memberId;
        this.profileUrl = profileUrl;
        this.nickname = nickname;
        this.dogName = dogName;
        this.followerNumber = followerNumber;
        this.followeeNumber = followeeNumber;
    }

}
