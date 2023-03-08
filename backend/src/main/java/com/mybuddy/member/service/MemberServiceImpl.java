package com.mybuddy.member.service;

import com.mybuddy.member.entity.Member;
import com.mybuddy.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member createMember(Member member) {
        verifyIfEmailExists(member.getEmail());

        return memberRepository.save(member);
    }

    @Override
    public Member updateMember(Member member) {
        Member obtainedMember = findExistMemberById(member.getMemberId());

        Optional.ofNullable(member.getNickname())
                .ifPresent(obtainedMember::setNickname);
        Optional.ofNullable(member.getDogName())
                .ifPresent(obtainedMember::setDogName);
        Optional.ofNullable(member.getLocation())
                .ifPresent(obtainedMember::setLocation);
        Optional.ofNullable(member.getAboutMe())
                .ifPresent(obtainedMember::setAboutMe);

        return memberRepository.save(obtainedMember);
    }

    @Override
    public Member getMember(Long memberId) {
        return findExistMemberById(memberId);
    }

    @Override
    public List<Member> getMemberList() {
        return memberRepository.findAll()
                .stream()
                .filter(member -> member.getMemberStatus() == Member.MemberStatus.ACTIVE)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteMember(Long memberId) {
        Member obtainedMember = findExistMemberById(memberId);

        obtainedMember.setMemberStatus(Member.MemberStatus.DELETED);

        memberRepository.save(obtainedMember);
    }

    @Override
    public void verifyIfEmailExists(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent())
            throw new RuntimeException();
    }

    @Override
    public Member findExistMemberById(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);

        Member obtainedMember = optionalMember
                .orElseThrow(() -> new RuntimeException());

        if (obtainedMember.getMemberStatus() == Member.MemberStatus.DELETED) {
            throw new RuntimeException();
        }

        return obtainedMember;
    }
}
