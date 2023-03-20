package com.mybuddy.member.dto;

import com.mybuddy.member.entity.Member.DogGender;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberCreateDto {

    @Email
    @NotBlank
    private final String email;

    @NotBlank
    @Pattern(regexp = "^[0-9A-Za-z]{8,20}$",
        message = "숫자, 영어(대문자 구분)를 포함하여 8 - 20 글자만 사용 가능합니다.")
    private final String password;

    @NotBlank
    private final String nickname;

    @NotBlank
    private final String dogName;

    @NotNull
    private final DogGender dogGender;

    @Builder
    public MemberCreateDto(String email, String password, String nickname, String dogName,
                           DogGender dogGender) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.dogName = dogName;
        this.dogGender = dogGender;
    }
}
