package com.mybuddy.member.service;

import com.mybuddy.member.entity.Member;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface MemberService {

    Member createMember(Member member, MultipartFile profileImage);

    Member updateMember(Member member, MultipartFile profileImage);

    Member getMember(Long memberId);

    List<Member> getMemberList();

    void deleteMember(Long memberId);

    void verifyIfEmailExists(String email);

    Member findExistMemberById(Long memberId);
}
