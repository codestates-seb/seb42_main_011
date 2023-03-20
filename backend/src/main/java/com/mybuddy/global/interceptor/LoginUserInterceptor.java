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

        boolean sendUserInfo = false;

        if (authentication != null && authentication.getPrincipal() instanceof PrincipalDto) {
            PrincipalDto principal = (PrincipalDto) authentication.getPrincipal();
            loginUserId = principal.getLoginUserId();

            String requestUri = request.getRequestURI();
            String requestMethod = request.getMethod();

            //  ---------------------------
            // 01) 특정 요청에 대해서만 로그인한 유저 정보를 전달하는 코드입니다.

            // 예를 들어 comments 엔드포인트는 전부 로그인한 유저의 정보가 필요합니다.
            if (requestUri.startsWith(DEFAULT_URL + "/comments"))
                sendUserInfo = true;

            //이런식으로 특정 메소드와 URI로 조건을 주셔도 됩니다.
            //else if (requestMethod.equals("PATCH") && requestUri.startsWith(DEFAULT_URL + "/bulletin-posts")) { }


            //  ---------------------------
            // 02) 유저 정보 전달을 위한 코드입니다.
            if (sendUserInfo == true)
                request.setAttribute("loginUserId", loginUserId);

        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}