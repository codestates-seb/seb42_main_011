package com.mybuddy.email.controller;

import com.mybuddy.email.dto.EmailDto;
import com.mybuddy.email.service.EmailService;
import com.mybuddy.global.utils.ApiSingleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.mail.MessagingException;
import javax.validation.Valid;

@Controller
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/password")
    public ResponseEntity<ApiSingleResponse> sendEmailForNewPassword(@Valid @RequestBody EmailDto emailDto) throws MessagingException {

        emailService.sendEmailForPasswordReset(emailDto.getEmail());

        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.OK, "이메일이 전송되었습니다.");

        return ResponseEntity.ok(response);
    }
}
