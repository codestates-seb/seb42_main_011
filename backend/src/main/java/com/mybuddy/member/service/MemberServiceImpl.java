package com.mybuddy.member.service;

import com.mybuddy.global.auth.utils.MemberAuthorityUtils;

import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.exception.LogicExceptionCode;
import com.mybuddy.global.storage.StorageService;
import com.mybuddy.global.utils.CustomBeanUtils;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.entity.Member.MemberStatus;
import com.mybuddy.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final StorageService storageService;

    private final CustomBeanUtils<Member> customBeanUtils;

    private final PasswordEncoder passwordEncoder;

    private final MemberAuthorityUtils authorityUtils;

    @Override
    public Member createMember(Member member, MultipartFile profileImage) {
        verifyIfEmailExists(member.getEmail());
        verifyIfNicknameExists(member.getNickname());

        Optional.ofNullable(profileImage)
                .ifPresent(image ->
                        member.setProfileUrl(
                                storageService.storeImage(image)));

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    @Override
    public Member updateMember(Member member, MultipartFile profileImage, Long loginUserId) {
        verifyResourceOwner(member.getMemberId(), loginUserId);
        Member obtainedMember = findExistMemberById(member.getMemberId());

        Member updatedMember = customBeanUtils.copyNonNullProperties(member, obtainedMember);

        Optional.ofNullable(profileImage)
                .ifPresent(image ->
                        updatedMember.setProfileUrl(
                                storageService.storeImage(image)));

        return memberRepository.save(updatedMember);
    }

    @Override
    public Member getMember(Long memberId) {
        return findExistMemberById(memberId);
    }

    @Override
    public Member getAllStatusMember(Long memberId) {
        return memberRepository.findById(memberId).get();
    }

    @Override // ADMIN 조회용으로 탈퇴 회원의 정보까지 모두 조회 가능.
    public Page<Member> getMemberList(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending()));
    }

    @Override
    public void deleteMember(Long memberId, long loginUserId) {
        verifyResourceOwner(memberId, loginUserId);
        Member obtainedMember = findExistMemberById(memberId);

        obtainedMember.setMemberStatus(MemberStatus.DELETED);

        memberRepository.save(obtainedMember);
    }

    @Override
    public void verifyIfEmailExists(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent())
            throw new LogicException(LogicExceptionCode.MEMBER_ALREADY_EXISTS);
    }

    @Override
    public void verifyIfNicknameExists(String nickname) {
        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);

        if (optionalMember.isPresent())
            throw new LogicException(LogicExceptionCode.NICKNAME_ALREADY_EXISTS);
    }

    @Override
    public Member findExistMemberById(Long memberId) {
        Optional<Member> optionalMember = memberRepository
                .findByMemberIdAndMemberStatusIs(memberId, MemberStatus.ACTIVE);

        Member obtainedMember = optionalMember
                .orElseThrow(() -> new LogicException(LogicExceptionCode.MEMBER_NOT_FOUND));

        return obtainedMember;
    }

    @Override
    public Member findExistMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository
                .findByMemberEmailAndMemberStatusIs(email, MemberStatus.ACTIVE);

        Member obtainedMember = optionalMember
                .orElseThrow(() -> new LogicException(LogicExceptionCode.MEMBER_NOT_FOUND));

        return obtainedMember;
    }

    protected void verifyResourceOwner(Long memberId, Long loginUserId) {
        if (!memberId.equals(loginUserId))
            throw new LogicException(LogicExceptionCode.NOT_RESOURCE_OWNER);
    }

    @Override
    public void createNewPassword(String email, String password) {

        Member member = findExistMemberByEmail(email);

        String encryptedPassword = passwordEncoder.encode(password);
        member.setPassword(encryptedPassword);

    }
}
