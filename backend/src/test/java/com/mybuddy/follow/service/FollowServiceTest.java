package com.mybuddy.follow.service;

import com.mybuddy.follow.entity.Follow;
import com.mybuddy.follow.repository.FollowRepository;
import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.mockdata.MockTestData;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.service.MemberService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.function.Executable;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;

@ExtendWith(MockitoExtension.class)
public class FollowServiceTest {

    @Mock
    private FollowRepository followRepository;

    @Mock
    private MemberService memberService;

    @Spy
    @InjectMocks
    private FollowServiceImpl followService;

    @DisplayName("회원 팔로우 로직 (Service)")
    @Test
    public void createFollowTest() {
        // Given
        Member member = MockTestData.MockMember.getMember();
        Follow follow = MockTestData.MockFollow.getFollow();
        Long mockLoginUserId = 3L;

        doNothing().when(followService).verifyIfFollowed(follow.getFollowId(), mockLoginUserId);
        given(memberService.findExistMemberById(Mockito.anyLong()))
                .willReturn(member);
        given(followRepository.save(Mockito.any(Follow.class)))
                .willReturn(follow);

        // When
        Executable executable = () -> followService.createFollow(member.getMemberId(), mockLoginUserId);

        // Then
        assertDoesNotThrow(executable);
    }

    @DisplayName("회원 팔로워 목록 조회 로직 (Service)")
    @Test
    public void getFollowerListTest() {
        // Given
        List<Follow> followList = MockTestData.MockFollow.getFollowList();
        Member obtainedMember = MockTestData.MockMember.getMember();
        Long mockLoginUserId = 2L;
        int page = 1;
        int size = 10;

        given(followRepository.findFollowListByFolloweeId(Mockito.anyLong()))
                .willReturn(followList);
        given(memberService.getAllStatusMember(Mockito.anyLong()))
                .willReturn(obtainedMember);

        // When
        Executable executable = () -> followService.getFollowerList(page, size, mockLoginUserId);

        // Then
        assertDoesNotThrow(executable);
    }

    @DisplayName("회원 팔로잉 목록 조회 로직 (Service)")
    @Test
    public void getFolloweeListTest() {
        // Given
        List<Follow> followList = MockTestData.MockFollow.getFollowList();
        Member obtainedMember = MockTestData.MockMember.getMember();
        Long mockLoginUserId = 2L;
        int page = 1;
        int size = 10;

        given(followRepository.findFollowListByFollowerId(Mockito.anyLong()))
                .willReturn(followList);
        given(memberService.getAllStatusMember(Mockito.anyLong()))
                .willReturn(obtainedMember);

        // When
        Executable executable = () -> followService.getFolloweeList(page, size, mockLoginUserId);

        // Then
        assertDoesNotThrow(executable);
    }

    @DisplayName("회원 팔로잉 취소 로직 (Service)")
    @Test
    public void deleteFollowTest() {
        // Given
        Follow obtainedFollow = MockTestData.MockFollow.getFollow();
        Long mockLoginUserId = 2L;

        given(followRepository.findByFolloweeIdAndFollowerId(Mockito.anyLong(), Mockito.anyLong()))
                .willReturn(Optional.of(obtainedFollow));
        doNothing().when(followRepository).delete(obtainedFollow);

        // When
        Executable executable = () -> followService.deleteFollow(obtainedFollow.getFollowId(), mockLoginUserId);

        // Then
        assertDoesNotThrow(executable);
    }

    @DisplayName("회원 팔로우 예외 처리 로직 (Service)")
    @Test
    public void verifyIfFollowedExceptionTest() {
        // Given
        Follow obtainedFollow = MockTestData.MockFollow.getFollow();
        Long mockLoginUserId = 2L;

        given(followRepository.findByFolloweeIdAndFollowerId(Mockito.anyLong(), Mockito.anyLong()))
                .willReturn(Optional.of(obtainedFollow));

        // When
        Executable executable = () -> followService
                .verifyIfFollowed(obtainedFollow.getFollowee().getMemberId(), mockLoginUserId);

        // Then
        assertThrows(LogicException.class, executable);
    }
}
