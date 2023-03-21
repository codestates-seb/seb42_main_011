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
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;

    private final MemberAuthorityUtils authorityUtils;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
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
                                .antMatchers(HttpMethod.GET, "/api/*/search").permitAll() //hasRole("USER") ??
//
//                                // Comment
//                                .antMatchers(HttpMethod.POST, "/api/*/comments").hasRole("USER")
//                                .antMatchers(HttpMethod.PATCH, "/api/*/comments/**").hasRole("USER")
//                                .antMatchers(HttpMethod.DELETE, "/api/*/comments/**").hasAnyRole("USER", "ADMIN")

                                // Amenity :확실 X
                                .antMatchers(HttpMethod.GET, "/api/*/amenities").permitAll()
                                .antMatchers(HttpMethod.GET, "/api/*/amenities/**").permitAll()

                                // Password - Email
                                .antMatchers(HttpMethod.POST, "/api/*/password").permitAll()

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
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter =
                    new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/api/v1/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
