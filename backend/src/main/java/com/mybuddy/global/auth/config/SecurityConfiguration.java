package com.mybuddy.global.auth.config;

import com.mybuddy.global.auth.filter.JwtAuthenticationFilter;
import com.mybuddy.global.auth.filter.JwtVerificationFilter;
import com.mybuddy.global.auth.handler.MemberAccessDeniedHandler;
import com.mybuddy.global.auth.handler.MemberAuthenticationEntryPoint;
import com.mybuddy.global.auth.handler.MemberAuthenticationFailureHandler;
import com.mybuddy.global.auth.handler.MemberAuthenticationSuccessHandler;
import com.mybuddy.global.auth.jwt.JwtTokenizer;
import com.mybuddy.global.auth.utils.MemberAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;

    private final MemberAuthorityUtils authorityUtils;

    private final RedisTemplate<String, String> redisTemplate;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()

                .csrf().disable()
                .cors(Customizer.withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()

                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()

                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
//                        .anyRequest().permitAll()
//                        .antMatchers("/h2/**").permitAll()
                                .antMatchers(HttpMethod.POST, "/api/*/auth/refresh").permitAll()
                                .antMatchers(HttpMethod.POST, "/api/*/members").permitAll()
                                .antMatchers(HttpMethod.PATCH, "/api/*/members/**").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/api/*/members").hasRole("ADMIN")
                                .antMatchers(HttpMethod.GET, "/api/*/members/**").permitAll()
                                .antMatchers(HttpMethod.DELETE, "/api/*/members/**").hasAnyRole("USER", "ADMIN")

                                // Bulletin-Post & Like
                                .antMatchers(HttpMethod.POST, "/api/*/bulletin-posts").hasRole("USER")
                                .antMatchers(HttpMethod.POST, "/api/*/bulletin-posts/**").hasRole("USER")
                                .antMatchers(HttpMethod.POST, "/api/*/bulletin-posts/**").hasRole("USER")
                                .antMatchers(HttpMethod.PATCH, "/api/*/bulletin-posts/**").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/api/*/bulletin-posts/**").permitAll()
                                .antMatchers(HttpMethod.DELETE, "/api/*/bulletin-posts/**").hasAnyRole("USER", "ADMIN")

                                // Search
                                .antMatchers(HttpMethod.GET, "/api/*/search").permitAll()

                                // Amenity
                                .antMatchers(HttpMethod.GET, "/api/*/amenities").permitAll()
                                .antMatchers(HttpMethod.GET, "/api/*/amenities/**").permitAll()

                                // Password (Email전송)
                                .antMatchers(HttpMethod.POST, "/api/*/password").permitAll()
                                .antMatchers(HttpMethod.POST, "/api/*/new-password").hasRole("USER")


                                // Comment, Follower
                                .anyRequest().authenticated()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        // CORS 구성
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("*");
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Access-Control-Allow-Credentials");

        // 허용할 출처(origin) 명시적으로 지정
//
//        configuration.addAllowedMethod("*");
//        configuration.addAllowedOrigin("http://my-buddy.co.kr");
//        configuration.addAllowedOrigin("https://my-buddy.co.kr");
//        configuration.addAllowedOrigin("http://my-buddy.shop");
//        configuration.addAllowedOrigin("https://my-buddy.shop");
//
//
//        //AllowedMethods
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
//
//        //AllowedHeader
//        configuration.addAllowedHeader("Authorization");
//        configuration.addAllowedHeader("Content-Type");
//        configuration.addAllowedHeader("Accept");
//        configuration.addAllowedHeader("Origin");
//        configuration.addAllowedHeader("X-Requested-With");
//
//        //ExposedHeader
//        configuration.addExposedHeader("Authorization");
//        configuration.addExposedHeader("Access-Control-Allow-Credentials");
//        configuration.addExposedHeader("Access-Control-Allow-Origin");
//        configuration.addExposedHeader("Access-Control-Allow-Methods");
//
//        //CORS 요청 처리시 자격 증명 포함 여부 명시적으로 지정 : Cookie-Axios를 위함
//        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }


    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter =
                    new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisTemplate);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/v1/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter =
                    new JwtVerificationFilter(jwtTokenizer, authorityUtils, redisTemplate);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
