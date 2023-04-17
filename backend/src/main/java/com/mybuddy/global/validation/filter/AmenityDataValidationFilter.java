package com.mybuddy.global.validation.filter;


import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.exception.LogicExceptionCode;
import com.mybuddy.global.validation.validator.RegionValidator;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "AmenityDataValidationFilter")
public class AmenityDataValidationFilter extends OncePerRequestFilter {
    private final RegionValidator regionValidator;

    public AmenityDataValidationFilter(RegionValidator regionValidator) {
        this.regionValidator = regionValidator;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String state = request.getParameter("state");
        String region = request.getParameter("region");

        try {
            if (request.getRequestURI().equals("/api/v1/amenities") && state != null && region != null) {
                if (!regionValidator.isValidRegion(state, region)) {
                    throw new LogicException(LogicExceptionCode.STATE_REGION_BAD_REQUEST);
                }
            }
            filterChain.doFilter(request, response);
        } catch (LogicException le) {
            //request.setAttribute("exception", le);
            //이후에 에러 메세지 커스텀을 할 예정입니다.(2023.04.15 강지은)
            throw new ServletException("state-region 쌍이 맞지 않습니다.");
        }
    }
}
