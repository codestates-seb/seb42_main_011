package com.mybuddy.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberPatchDto {

    private String nickname;

    private String dogName;

    private String location;

    private String aboutMe;

    @Builder
    public MemberPatchDto(String nickname, String dogName, String location, String aboutMe) {
        this.nickname = nickname;
        this.dogName = dogName;
        this.location = location;
        this.aboutMe = aboutMe;
    }
}
