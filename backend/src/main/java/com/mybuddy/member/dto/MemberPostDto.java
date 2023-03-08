package com.mybuddy.member.dto;

import com.mybuddy.member.entity.Member.DogGender;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberPostDto {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Pattern(regexp = "^[0-9A-Za-z]{8,20}$",
        message = "숫자, 영어(대문자 구분)를 포함하여 8 - 20 글자만 사용 가능합니다.")
    private String password;

    @NotBlank
    private String nickname;

    @NotBlank
    private String dogName;

    @NotNull
    private DogGender dogGender;

    @Builder
    public MemberPostDto(String email, String password, String nickname, String dogName,
        DogGender dogGender) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.dogName = dogName;
        this.dogGender = dogGender;
    }
}
