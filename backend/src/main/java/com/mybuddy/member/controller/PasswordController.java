package com.mybuddy.member.controller;

import com.mybuddy.global.utils.ApiSingleResponse;
import com.mybuddy.member.dto.MemberPrivacyDto;
import com.mybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PasswordController {

    private final MemberService memberService;

    @PostMapping("/new-password")
    public ResponseEntity<ApiSingleResponse> getNewPassword(@Valid @RequestBody MemberPrivacyDto privacyDto,
                                                            HttpServletRequest request) {

        memberService.createNewPassword(privacyDto.getEmail(), privacyDto.getPassword());

        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.OK, "비밀번호가 변경되었습니다.");

        return ResponseEntity.ok(response);
    }
}
