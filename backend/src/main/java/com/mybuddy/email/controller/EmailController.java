package com.mybuddy.email.controller;

import com.mybuddy.email.dto.EmailDto;
import com.mybuddy.email.service.EmailService;
import lombok.RequiredArgsConstructor;
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
    public void sendEmailForNewPassword(@Valid @RequestBody EmailDto emailDto) throws MessagingException {
        emailService.sendEmailForPasswordReset(emailDto.getEmail(), "testUrl");
    }
}
