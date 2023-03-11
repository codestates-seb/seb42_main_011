package com.mybuddy.member.service;

import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.mockdata.MockTestData;
import com.mybuddy.global.storage.StorageService;
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

import java.nio.charset.StandardCharsets;
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
        doNothing().when(storageService).storeImage(profileImage);
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

        given(memberRepository.findByMemberIdAndMemberStatusIs(
                Mockito.anyLong(), Mockito.any(MemberStatus.class)))
                .willReturn(Optional.of(new Member()));
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
}
