package com.mybuddy.global.audit;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@RequiredArgsConstructor
@Component
public class CreateAuditorAware implements AuditorAware<String> {

//    private final HttpSession httpSession;

    @Override
    public Optional<String> getCurrentAuditor() {
//        SessionUser user = (SessionUser) httpSession.getAttribute("user");
//        if (user == null)
//            return null;

//        return Optional.ofNullable(user.getId());

        return Optional.of("back-end");

    }
}