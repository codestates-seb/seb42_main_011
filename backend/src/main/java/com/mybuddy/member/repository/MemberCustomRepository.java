package com.mybuddy.member.repository;

import com.mybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

public interface MemberCustomRepository {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);

    Optional<Member> findByMemberIdAndMemberStatusIs(Long memberId, Member.MemberStatus memberStatus);

    Optional<Member> findByMemberEmailAndMemberStatusIs(String email, Member.MemberStatus memberStatus);

    Page<Member> findByMemberStatus(Member.MemberStatus memberStatus, PageRequest pageRequest);
}
