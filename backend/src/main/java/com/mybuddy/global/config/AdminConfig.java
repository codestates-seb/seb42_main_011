package com.mybuddy.global.config;

import com.mybuddy.global.auth.utils.MemberAuthorityUtils;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.PostConstruct;
import java.util.List;

@Profile({"h2", "mysql"})
@Configuration
@RequiredArgsConstructor
public class AdminConfig {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    private final MemberAuthorityUtils authorityUtils;

    @Value("${mail.address.admin}")
    private String adminMailAddress;

    @PostConstruct
    private Member registerMemberAsAdmin() {
        Member admin = Member.builder()
                .memberId(1L)
                .email(adminMailAddress)
                .password("admin")
                .nickname("MyBuddyAdmin")
                .dogName("MyBuddyAdmin")
                .dogGender(Member.DogGender.MALE)
                .build();

        String encryptedPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(admin.getEmail());
        admin.setRoles(roles);
        return memberRepository.save(admin);
    }
}
