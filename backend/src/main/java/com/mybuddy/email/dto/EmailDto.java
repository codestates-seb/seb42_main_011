package com.mybuddy.email.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class EmailDto {
    @Email
    @NotBlank
    private String email;

}
