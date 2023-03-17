package com.mybuddy.member.service;

import com.mybuddy.global.auth.dto.PrincipalDto;
import com.mybuddy.global.auth.utils.MemberAuthorityUtils;

import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.exception.LogicExceptionCode;
import com.mybuddy.global.storage.StorageService;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.entity.Member.MemberStatus;
import com.mybuddy.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final StorageService storageService;

    private final PasswordEncoder passwordEncoder;

    private final MemberAuthorityUtils authorityUtils;

    @Override
    public Member createMember(Member member, MultipartFile profileImage) {
        verifyIfEmailExists(member.getEmail());
        verifyIfNicknameExists(member.getNickname());

        Optional.ofNullable(profileImage)
                .ifPresent(storageService::storeImage);
        Optional.ofNullable(profileImage)
                .ifPresent(image -> member.setProfileUrl(
                        storageService.getPath() + "/" + image.getOriginalFilename())
                );

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    @Override
    public Member updateMember(Member member, MultipartFile profileImage) {
        compareLoginUserIdToMemberId(member.getMemberId());
        Member obtainedMember = findExistMemberById(member.getMemberId());

        Optional.ofNullable(member.getNickname())
                .ifPresent(obtainedMember::setNickname);
        Optional.ofNullable(member.getDogName())
                .ifPresent(obtainedMember::setDogName);
        Optional.ofNullable(member.getAddress())
                .ifPresent(obtainedMember::setAddress);
        Optional.ofNullable(member.getAboutMe())
                .ifPresent(obtainedMember::setAboutMe);
        Optional.ofNullable(profileImage)
                .ifPresent(storageService::storeImage);
        Optional.ofNullable(profileImage)
                .ifPresent(image -> obtainedMember.setProfileUrl(
                        storageService.getPath() + "/" + image.getOriginalFilename())
                );

        return memberRepository.save(obtainedMember);
    }

    @Override
    public Member getMember(Long memberId) {
        return findExistMemberById(memberId);
    }

    @Override // ADMIN 조회용으로 탈퇴 회원의 정보까지 모두 조회 가능.
    public Page<Member> getMemberList(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending()));
    }

    @Override
    public void deleteMember(Long memberId) {
        compareLoginUserIdToMemberId(memberId);
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
    public void compareLoginUserIdToMemberId(Long memberId) {
        if (!memberId.equals(getLoginUserId()))
            throw new LogicException(LogicExceptionCode.MEMBER_UNAUTHORIZED);
    }

    protected Long getLoginUserId() {
        Long loginUserId = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof PrincipalDto) {
            PrincipalDto principal = (PrincipalDto) authentication.getPrincipal();
            loginUserId = principal.getLoginUserId();
        }

        return loginUserId;
    }

    @PostConstruct
    private Member registerMemberAsAdmin() {
        Member admin = Member.builder()
                .memberId(1L)
                .email("admin@mybuddy.com")
                .password("admin")
                .nickname("admin")
                .dogName("admin")
                .dogGender(Member.DogGender.MALE)
                .build();

        String encryptedPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(admin.getEmail());
        admin.setRoles(roles);
        return memberRepository.save(admin);
    }
}
