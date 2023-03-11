package com.mybuddy.member.repository;


import com.mybuddy.member.entity.Member;
import com.mybuddy.member.entity.Member.MemberStatus;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByMemberIdAndMemberStatusIs(Long memberId, MemberStatus memberStatus);
}
