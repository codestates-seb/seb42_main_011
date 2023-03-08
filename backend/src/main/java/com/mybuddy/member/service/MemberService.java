package com.mybuddy.member.service;

import com.mybuddy.member.entity.Member;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MemberService {

    Member createMember(Member member);

    Member updateMember(Member member);

    Member getMember(Long memberId);

    List<Member> getMemberList();

    void deleteMember(Long memberId);

    void verifyIfEmailExists(String email);

    Member findExistMemberById(Long memberId);
}
