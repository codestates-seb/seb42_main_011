package com.mybuddy.member.dto;

import com.mybuddy.member.entity.Member.MemberStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberListResponseDto {

    private final String nickname;

    private final String dogName;

    private final Long followerNumber;

    private final Long followeeNumber;

    private final String profileUrl;

    private final MemberStatus memberStatus;

    @Builder
    public MemberListResponseDto(String nickname, String dogName, Long followerNumber,
                                 Long followeeNumber, String profileUrl, MemberStatus memberStatus) {
        this.nickname = nickname;
        this.dogName = dogName;
        this.followerNumber = followerNumber;
        this.followeeNumber = followeeNumber;
        this.profileUrl = profileUrl;
        this.memberStatus = memberStatus;
    }
}
