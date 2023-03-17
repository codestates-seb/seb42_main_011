package com.mybuddy.follow.repository;

import com.mybuddy.follow.entity.Follow;
import com.mybuddy.global.config.TestConfig;
import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.exception.LogicExceptionCode;
import com.mybuddy.global.mockdata.MockTestData;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Import(TestConfig.class)
public class FollowRepositoryTest {

    @Autowired
    FollowRepository followRepository;

    @Autowired
    MemberRepository memberRepository;

    Member admin = MockTestData.MockMember.getAdmin();

    Member member1 = MockTestData.MockMember.getMember();

    Member member2 = MockTestData.MockMember.getSecondMember();

    Follow follow;

    @BeforeAll
    public void init() {
        memberRepository.save(admin);
        memberRepository.save(member1);
        memberRepository.save(member2);

        follow = Follow.builder()
                .follower(member1)
                .followee(member2)
                .build();

        followRepository.save(follow);
    }

    @Test
    public void findByFolloweeIdTest() {
        Optional<Follow> optionalFollow =
                followRepository.findByFolloweeId(follow.getFollowee().getMemberId());
        Follow obtainedFollow = optionalFollow.orElseThrow(() ->
                new LogicException(LogicExceptionCode.FOLLOW_NOT_FOUND));

        assertEquals(obtainedFollow.getFollowId(), follow.getFollowId());
        assertEquals(obtainedFollow.getFollower().getMemberId(), follow.getFollower().getMemberId());
        assertEquals(obtainedFollow.getFollower().getNickname(), follow.getFollower().getNickname());
        assertEquals(obtainedFollow.getFollowee().getMemberId(), follow.getFollowee().getMemberId());
        assertEquals(obtainedFollow.getFollowee().getNickname(), follow.getFollowee().getNickname());
    }

    @Test
    public void findByFollowerIdAndFolloweeIdTest() {
        Optional<Follow> optionalFollow =
                followRepository.findByFollowerIdAndFolloweeId(
                        follow.getFollower().getMemberId(), follow.getFollowee().getMemberId());
        Follow obtainedFollow = optionalFollow.orElseThrow(() ->
                new LogicException(LogicExceptionCode.FOLLOW_NOT_FOUND));

        assertEquals(obtainedFollow.getFollowId(), follow.getFollowId());
        assertEquals(obtainedFollow.getFollower().getMemberId(), follow.getFollower().getMemberId());
        assertEquals(obtainedFollow.getFollower().getNickname(), follow.getFollower().getNickname());
        assertEquals(obtainedFollow.getFollowee().getMemberId(), follow.getFollowee().getMemberId());
        assertEquals(obtainedFollow.getFollowee().getNickname(), follow.getFollowee().getNickname());
    }

    @Test
    public void findFollowListByFolloweeIdTest() {
        List<Follow> followList = followRepository
                .findFollowListByFolloweeId(follow.getFollowee().getMemberId());

        assertEquals(followList.get(0).getFollowId(), follow.getFollowId());
        assertEquals(followList.get(0).getFollower().getMemberId(), follow.getFollower().getMemberId());
        assertEquals(followList.get(0).getFollower().getNickname(), follow.getFollower().getNickname());
        assertEquals(followList.get(0).getFollowee().getMemberId(), follow.getFollowee().getMemberId());
        assertEquals(followList.get(0).getFollowee().getNickname(), follow.getFollowee().getNickname());
    }

    @Test
    public void findFollowListByFollowerIdTest() {
        List<Follow> followList = followRepository
                .findFollowListByFollowerId(follow.getFollower().getMemberId());

        assertEquals(followList.get(0).getFollowId(), follow.getFollowId());
        assertEquals(followList.get(0).getFollower().getMemberId(), follow.getFollower().getMemberId());
        assertEquals(followList.get(0).getFollower().getNickname(), follow.getFollower().getNickname());
        assertEquals(followList.get(0).getFollowee().getMemberId(), follow.getFollowee().getMemberId());
        assertEquals(followList.get(0).getFollowee().getNickname(), follow.getFollowee().getNickname());
    }
}
