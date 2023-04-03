package com.mybuddy.member.repository;

import com.mybuddy.global.config.TestConfig;
import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.exception.LogicExceptionCode;
import com.mybuddy.global.mockdata.MockTestData;
import com.mybuddy.member.entity.Member;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Import(TestConfig.class)
public class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    Member admin = MockTestData.MockMember.getAdmin();

    Member member = MockTestData.MockMember.getMember();

    @BeforeAll
    public void init() {
        memberRepository.save(admin);
        memberRepository.save(member);
    }

    @Test
    public void findByEmailTest() {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());
        Member obtainedMember = optionalMember.orElseThrow(() ->
                new LogicException(LogicExceptionCode.MEMBER_NOT_FOUND));

        assertEquals(obtainedMember.getMemberId(), member.getMemberId());
        assertEquals(obtainedMember.getEmail(), member.getEmail());
        assertEquals(obtainedMember.getPassword(), member.getPassword());
        assertEquals(obtainedMember.getNickname(), member.getNickname());
        assertEquals(obtainedMember.getAboutMe(), member.getAboutMe());
        assertEquals(obtainedMember.getDogName(), member.getDogName());
        assertEquals(obtainedMember.getDogGender(), member.getDogGender());
        assertEquals(obtainedMember.getProfileUrl(), member.getProfileUrl());
        assertEquals(obtainedMember.getAddress(), member.getAddress());
    }

    @Test
    public void findByNicknameTest() {
        Optional<Member> optionalMember = memberRepository.findByNickname(member.getNickname());
        Member obtainedMember = optionalMember.orElseThrow(() ->
                new LogicException(LogicExceptionCode.MEMBER_NOT_FOUND));

        assertEquals(obtainedMember.getMemberId(), member.getMemberId());
        assertEquals(obtainedMember.getEmail(), member.getEmail());
        assertEquals(obtainedMember.getPassword(), member.getPassword());
        assertEquals(obtainedMember.getNickname(), member.getNickname());
        assertEquals(obtainedMember.getAboutMe(), member.getAboutMe());
        assertEquals(obtainedMember.getDogName(), member.getDogName());
        assertEquals(obtainedMember.getDogGender(), member.getDogGender());
        assertEquals(obtainedMember.getProfileUrl(), member.getProfileUrl());
        assertEquals(obtainedMember.getAddress(), member.getAddress());
    }

    @Test
    public void findByMemberIdAndMemberStatusIsTest() {
        Optional<Member> optionalMember = memberRepository
                .findByMemberIdAndMemberStatusIs(member.getMemberId(), Member.MemberStatus.ACTIVE);
        Member obtainedMember = optionalMember.orElseThrow(() ->
                new LogicException(LogicExceptionCode.MEMBER_NOT_FOUND));

        assertEquals(obtainedMember.getMemberId(), member.getMemberId());
        assertEquals(obtainedMember.getEmail(), member.getEmail());
        assertEquals(obtainedMember.getPassword(), member.getPassword());
        assertEquals(obtainedMember.getNickname(), member.getNickname());
        assertEquals(obtainedMember.getAboutMe(), member.getAboutMe());
        assertEquals(obtainedMember.getDogName(), member.getDogName());
        assertEquals(obtainedMember.getDogGender(), member.getDogGender());
        assertEquals(obtainedMember.getProfileUrl(), member.getProfileUrl());
        assertEquals(obtainedMember.getAddress(), member.getAddress());
    }

    @Test
    public void findByMemberEmailAndMemberStatusIsTest() {
        Optional<Member> optionalMember = memberRepository
                .findByMemberEmailAndMemberStatusIs(member.getEmail(), Member.MemberStatus.ACTIVE);
        Member obtainedMember = optionalMember.orElseThrow(() ->
                new LogicException(LogicExceptionCode.MEMBER_NOT_FOUND));

        assertEquals(obtainedMember.getMemberId(), member.getMemberId());
        assertEquals(obtainedMember.getEmail(), member.getEmail());
        assertEquals(obtainedMember.getPassword(), member.getPassword());
        assertEquals(obtainedMember.getNickname(), member.getNickname());
        assertEquals(obtainedMember.getAboutMe(), member.getAboutMe());
        assertEquals(obtainedMember.getDogName(), member.getDogName());
        assertEquals(obtainedMember.getDogGender(), member.getDogGender());
        assertEquals(obtainedMember.getProfileUrl(), member.getProfileUrl());
        assertEquals(obtainedMember.getAddress(), member.getAddress());
    }
}
