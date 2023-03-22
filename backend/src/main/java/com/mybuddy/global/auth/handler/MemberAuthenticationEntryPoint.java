package com.mybuddy.global.auth.handler;

import com.mybuddy.global.auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        Exception exception = (Exception) request.getAttribute("exception");
        String message = exception != null ? exception.getMessage() : authException.getMessage();
        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED, message);

        logExceptionMessage(authException, exception, message);
    }

    private void logExceptionMessage(AuthenticationException authException, Exception exception,
                                     String message) {
        log.warn("Unauthorized error occurred: {}", message);
    }
}
