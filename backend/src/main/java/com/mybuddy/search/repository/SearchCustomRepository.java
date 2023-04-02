package com.mybuddy.search.repository;

import com.mybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface SearchCustomRepository {
    Page<Member> findByNicknameExceptAdmin(String keyword, PageRequest pageRequest);

    Page<Member> findByDogNameExceptAdmin(String keyword, PageRequest pageRequest);

}
