package com.mybuddy.member.service;

import com.mybuddy.global.auth.utils.MemberAuthorityUtils;
import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.mockdata.MockTestData;
import com.mybuddy.global.storage.StorageService;
import com.mybuddy.global.utils.CustomBeanUtils;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.entity.Member.MemberStatus;
import com.mybuddy.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.function.Executable;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;

@ExtendWith(MockitoExtension.class)
public class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private StorageService storageService;

    @Mock
    private CustomBeanUtils<Member> customBeanUtils;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private MemberAuthorityUtils authorityUtils;

    @Spy
    @InjectMocks
    private MemberServiceImpl memberService;

    @DisplayName("회원 등록 로직 (Service)")
    @Test
    public void createMemberTest() {
        // Given
        Member member = MockTestData.MockMember.getMember();
        MockMultipartFile profileImage = new MockMultipartFile("profileImage", "image.png",
                MediaType.IMAGE_PNG_VALUE, "image".getBytes(StandardCharsets.UTF_8));

        doNothing().when(memberService).verifyIfEmailExists(Mockito.anyString());
        doNothing().when(memberService).verifyIfNicknameExists(Mockito.anyString());
        doNothing().when(storageService).storeImage(profileImage);
        given(passwordEncoder.encode(Mockito.anyString()))
                .willReturn("asdf1234");
        given(authorityUtils.createRoles(Mockito.anyString()))
                .willReturn(List.of("USER"));
        given(memberRepository.save(Mockito.any(Member.class)))
                .willReturn(member);

        // When
        Executable executable = () -> memberService.createMember(member, profileImage);

        // Then
        assertDoesNotThrow(executable);
    }

    @DisplayName("회원 정보 수정 로직 (Service)")
    @Test
    public void updateMemberTest() {
        // Given
        Member member = MockTestData.MockMember.getMember();
        MockMultipartFile profileImage = new MockMultipartFile("profileImage", "image.png",
                MediaType.IMAGE_PNG_VALUE, "image".getBytes(StandardCharsets.UTF_8));

        doNothing().when(memberService).compareLoginUserIdToMemberId(Mockito.anyLong());
        given(memberRepository.findByMemberIdAndMemberStatusIs(
                Mockito.anyLong(), Mockito.any(MemberStatus.class)))
                .willReturn(Optional.of(new Member()));
        given(customBeanUtils.copyNonNullProperties(Mockito.any(Member.class), Mockito.any(Member.class)))
                .willReturn(new Member());
        doNothing().when(storageService).storeImage(profileImage);
        given(memberRepository.save(Mockito.any(Member.class)))
                .willReturn(member);

        // When
        Executable executable = () -> memberService.updateMember(member, profileImage);

        // Then
        assertDoesNotThrow(executable);
    }

    @DisplayName("회원 상세 조회 로직 (Service)")
    @Test
    public void getMemberTest() {
        // Given
        Member obtainedMember = MockTestData.MockMember.getMember();

        given(memberRepository.findByMemberIdAndMemberStatusIs(
                Mockito.anyLong(), Mockito.any(MemberStatus.class)))
                .willReturn(Optional.of(new Member()));

        // When
        Executable executable = () -> memberService.getMember(obtainedMember.getMemberId());

        // Then
        assertDoesNotThrow(executable);
    }

    @DisplayName("회원 리스트 조회 로직 (Service)")
    @Test
    public void getMemberListTest() {
        // Given
        Page<Member> pagedMembers = MockTestData.MockMember.getPageMembers();
        int page = 1;
        int size = 10;

        given(memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("memberId").descending())))
                .willReturn(pagedMembers);

        // When
        Executable executable = () -> memberService.getMemberList(page, size);

        // Then
        assertDoesNotThrow(executable);
    }

    @DisplayName("회원 삭제 로직 (Service)")
    @Test
    public void deleteMemberTest() {
        // Given
        Member obtainedMember = MockTestData.MockMember.getMember();

        doNothing().when(memberService).compareLoginUserIdToMemberId(Mockito.anyLong());
        given(memberRepository.findByMemberIdAndMemberStatusIs(
                Mockito.anyLong(), Mockito.any(MemberStatus.class)))
                .willReturn(Optional.of(new Member()));
        given(memberRepository.save(Mockito.any(Member.class)))
                .willReturn(obtainedMember);

        // When
        Executable executable = () -> memberService.deleteMember(obtainedMember.getMemberId());

        // Then
        assertDoesNotThrow(executable);
    }

    @DisplayName("회원 이메일 존재 예외 처리 로직 (Service)")
    @Test
    public void verifyIfEmailExistsExceptionTest() {
        // Given
        Member obtainedMember = MockTestData.MockMember.getMember();

        given(memberRepository.findByEmail(Mockito.anyString()))
                .willReturn(Optional.of(obtainedMember));

        // When
        Executable executable = () -> memberService.verifyIfEmailExists(obtainedMember.getEmail());

        // Then
        assertThrows(LogicException.class, executable);
    }

    @DisplayName("회원 별명 존재 예외 처리 로직 (Service)")
    @Test
    public void verifyIfNicknameExistsExceptionTest() {
        // Given
        Member obtainedMember = MockTestData.MockMember.getMember();

        given(memberRepository.findByNickname(Mockito.anyString()))
                .willReturn(Optional.of(obtainedMember));

        // When
        Executable executable = () -> memberService.verifyIfNicknameExists(obtainedMember.getNickname());

        // Then
        assertThrows(LogicException.class, executable);
    }

    @DisplayName("회원 찾기 예외 처리 로직 (Service)")
    @Test
    public void findExistMemberByIdExceptionTest() {
        // Given
        given(memberRepository.findByMemberIdAndMemberStatusIs(
                Mockito.anyLong(), Mockito.any(MemberStatus.class)))
                .willReturn(Optional.empty());

        // When
        Executable executable = () -> memberService.findExistMemberById(1L);

        // Then
        assertThrows(LogicException.class, executable);
    }

    @DisplayName("로그인 회원 및 리소스 식별자 비교 예외 처리 로직 (Service)")
    @Test
    public void compareLoginUserIdToMemberIdExceptionTest() {
        // Given
        given(memberService.getLoginUserId())
                .willReturn(2L);

        // When
        Executable executable = () -> memberService.compareLoginUserIdToMemberId(1L);

        // Then
        assertThrows(LogicException.class, executable);
    }
}
