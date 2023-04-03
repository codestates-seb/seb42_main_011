package com.mybuddy.member.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class MemberPrivacyDto {

    @Email
    @NotBlank
    private final String email;

    @NotBlank
    @Pattern(regexp = "^[0-9A-Za-z]{8,20}$",
            message = "숫자, 영어(대문자 구분)를 포함하여 8 - 20 글자만 사용 가능합니다.")
    private final String password;

    @Builder
    public MemberPrivacyDto(String email, String password) {
        this.email = email;
        this.password = password;
    }
}