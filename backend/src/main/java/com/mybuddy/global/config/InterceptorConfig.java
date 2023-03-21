package com.mybuddy.global.config;

import com.mybuddy.global.interceptor.LoginUserInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginUserInterceptor());
        //comments는 전체 엔드포인트에 해당해서 인터셉터를 추가해도 되어서 여기다 이런식으로 작성해도 되지만 ->  .addPathPatterns("/api/v1/comments");
        //일단 주석처리하고, LoginUserInterceptor() 내부에서 처리되도록 작성해 놓았습니다. (2023.03.17 강지은)
    }
}
