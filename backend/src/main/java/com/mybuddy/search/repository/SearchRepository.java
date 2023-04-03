package com.mybuddy.search.repository;

import com.mybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SearchRepository extends JpaRepository<Member, Long>, SearchCustomRepository {

//    Page<Member> findByNicknameContaining(String keyword, PageRequest pageRequest);

//    Page<Member> findByDogNameContaining(String keyword, PageRequest pageRequest);


}
