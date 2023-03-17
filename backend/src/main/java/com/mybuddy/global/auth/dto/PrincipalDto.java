package com.mybuddy.global.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PrincipalDto {

    private final Long loginUserId;

    private final String email;

    @Builder
    public PrincipalDto(Long loginUserId, String email) {
        this.loginUserId = loginUserId;
        this.email = email;
    }
}
