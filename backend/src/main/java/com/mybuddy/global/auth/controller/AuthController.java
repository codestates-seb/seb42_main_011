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

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

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

        // 쿠키 적용 시에 사용
        /*String refreshToken = Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("Refresh"))
                .map(Cookie::getValue)
                .collect(Collectors.joining(""));*/

        String email = jwtTokenizer.getSubject(refreshToken);

        Member obtainedMember = memberService.findExistMemberByEmail(email);

        if (redisTemplate.opsForValue().get("RefreshToken:" + obtainedMember.getEmail()) == null) {
            return new ResponseEntity<>(ErrorResponse.of(HttpStatus.BAD_REQUEST,
                    "The refresh token is invalid."), HttpStatus.BAD_REQUEST);
        }

        String newAccessToken = jwtTokenizer.delegateAccessToken(obtainedMember);

        // 쿠키 적용 시에 사용
        /*Cookie cookie = new Cookie("Authorization", "Bearer " + newAccessToken);
        cookie.setPath("/");
        cookie.setHttpOnly(false);
        cookie.setMaxAge(1200);
        response.addCookie(cookie);*/

        response.addHeader("Authorization", "Bearer " + newAccessToken);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
        Long loginUserId = (Long) request.getAttribute("loginUserId");
        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");

        Member obtainedMember = memberService.findExistMemberById(loginUserId);

        if (redisTemplate.opsForValue().get("RefreshToken:" + obtainedMember.getEmail()) == null) {
            return new ResponseEntity<>(ErrorResponse.of(HttpStatus.BAD_REQUEST,
                    "The refresh token is invalid."), HttpStatus.BAD_REQUEST);
        }

        redisTemplate.delete("RefreshToken:" + obtainedMember.getEmail());

        redisTemplate.opsForValue().set(
                accessToken,
                "loggedOutAccessToken",
                jwtTokenizer.getTimeForExpiration(accessToken),
                TimeUnit.MILLISECONDS);

        return ResponseEntity.ok().build();
    }
}
