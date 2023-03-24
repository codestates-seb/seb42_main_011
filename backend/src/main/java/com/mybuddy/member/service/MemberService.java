package com.mybuddy.member.service;

import com.mybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    Member createMember(Member member, MultipartFile profileImage);

    Member updateMember(Member member, MultipartFile profileImage, Long loginUserId);

    Member getMember(Long memberId);

    Page<Member> getMemberList(int page, int size);

    void deleteMember(Long memberId, long loginUserId);

    void verifyIfEmailExists(String email);

    void verifyIfNicknameExists(String nickname);

    Member findExistMemberById(Long memberId);

    Member findExistMemberByEmail(String email);

    void createNewPassword(String email, String password);
}
