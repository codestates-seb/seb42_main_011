package com.mybuddy.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberPatchDto {

    private String nickname;

    private String dogName;

    private String address;

    private String aboutMe;

    @Builder
    public MemberPatchDto(String nickname, String dogName, String address, String aboutMe) {
        this.nickname = nickname;
        this.dogName = dogName;
        this.address = address;
        this.aboutMe = aboutMe;
    }
}
