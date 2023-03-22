package com.mybuddy.global.interceptor;

import com.mybuddy.global.auth.dto.PrincipalDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@Slf4j
public class LoginUserInterceptor implements HandlerInterceptor {

    private static final String DEFAULT_URL = "/api/v1";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        Long loginUserId;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();


        if (authentication != null && authentication.getPrincipal() instanceof PrincipalDto) {
            PrincipalDto principal = (PrincipalDto) authentication.getPrincipal();
            loginUserId = principal.getLoginUserId();


            request.setAttribute("loginUserId", loginUserId);

        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}