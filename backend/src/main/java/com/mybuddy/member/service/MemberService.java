package com.mybuddy.member.service;

import com.mybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    Member createMember(Member member, MultipartFile profileImage);

    Member updateMember(Member member, MultipartFile profileImage);

    Member getMember(Long memberId);

    Page<Member> getMemberList(int page, int size);

    void deleteMember(Long memberId);

    void verifyIfEmailExists(String email);

    void verifyIfNicknameExists(String nickname);

    Member findExistMemberById(Long memberId);

    void compareLoginUserIdToMemberId(Long id);
}
