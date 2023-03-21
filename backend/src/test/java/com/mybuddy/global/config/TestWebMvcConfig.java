package com.mybuddy.global.config;

import com.mybuddy.global.interceptor.HttpServletRequestInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class TestWebMvcConfig implements WebMvcConfigurer {
    @Autowired
    private HttpServletRequestInterceptor httpServletRequestInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(httpServletRequestInterceptor)
                .addPathPatterns("/**");
    }
}
