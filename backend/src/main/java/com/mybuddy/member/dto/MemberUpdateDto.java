package com.mybuddy.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberUpdateDto {

    private final String nickname;

    private final String dogName;

    private final String address;

    private final String aboutMe;

    @Builder
    public MemberUpdateDto(String nickname, String dogName, String address, String aboutMe) {
        this.nickname = nickname;
        this.dogName = dogName;
        this.address = address;
        this.aboutMe = aboutMe;
    }
}
