package com.mybuddy.global.auth.controller;

import com.mybuddy.global.auth.jwt.JwtTokenizer;
import com.mybuddy.global.utils.ErrorResponse;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtTokenizer jwtTokenizer;

    private final MemberService memberService;

    private final RedisTemplate<String, String> redisTemplate;

    @PostMapping("/refresh")
    public ResponseEntity refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = request.getHeader("Refresh");
        String email = jwtTokenizer.getSubject(refreshToken);

        Member obtainedMember = memberService.findExistMemberByEmail(email);

        if (redisTemplate.opsForValue().get("RefreshToken:" + obtainedMember.getEmail()) == null) {
            return new ResponseEntity<>(ErrorResponse.of(HttpStatus.BAD_REQUEST,
                    "The refresh token is invalid."), HttpStatus.BAD_REQUEST);
        }

        String newAccessToken = jwtTokenizer.delegateAccessToken(obtainedMember);

        response.addHeader("Authorization", "Bearer " + newAccessToken);

        return ResponseEntity.ok().build();
    }
}
