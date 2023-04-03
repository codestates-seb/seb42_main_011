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

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof PrincipalDto) {

            PrincipalDto principal = (PrincipalDto) authentication.getPrincipal();

            //이메일로 id가 담긴 토큰을 전송하지 않기 때문에 null 체크 로직이 추가되었습니다. (2023.03.24 강지은)
            if (principal.getLoginUserId() != null) {
                Long loginUserId = principal.getLoginUserId();
                request.setAttribute("loginUserId", loginUserId);
            }
        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}