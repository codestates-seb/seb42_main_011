package com.mybuddy.follow.service;

import com.mybuddy.follow.entity.Follow;
import com.mybuddy.follow.repository.FollowRepository;
import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.exception.LogicExceptionCode;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;

    private final MemberService memberService;

    // 임시 로직. 실제로는 getLoginUserId()로 멤버를 호출.
    private Member loginUser = Member.builder()
            .memberId(1L)
            .email("kimcoding@mybuddy.com")
            .password("asdf1234")
            .nickname("김코딩")
            .aboutMe("왕밤톨입니다.")
            .dogName("왕밤톨")
            .dogGender(Member.DogGender.MALE)
            .profileUrl("www.mybuddy.com/bamtol-the-king.png")
            .address("서울시 강북구")
            .build();

    @Override
    public Follow createFollow(Long followeeId) {
        verifyIfFollowed(followeeId);

        // Member loginUser = memberService.findExistMemberById(memberService.getLoginUserId());

        Member followee = memberService.findExistMemberById(followeeId);

        // if (followeeId.equals(getLoginUserId()))
        if (followeeId.equals(loginUser.getMemberId()))
            throw new LogicException(LogicExceptionCode.FOLLOW_NOT_POSSIBLE);

        Follow newFollow = Follow.builder()
                .follower(loginUser)
                .followee(followee)
                .build();

        return followRepository.save(newFollow);
    }

    @Override
    public Page<Member> getFollowerList(int page, int size) {
        // LoginUser가 followeeId로 저장되어 있는 리스트 불러오기. (getLoginUserId())
        List<Follow> followList = followRepository.findFollowListByFolloweeId(loginUser.getMemberId());
        List<Member> followerList = followList.stream()
                .map(following -> memberService.getMember(following.getFollower().getMemberId()))
                .sorted(Comparator.comparingLong(Member::getMemberId).reversed())
                .collect(Collectors.toList());

        return new PageImpl<>(followerList, PageRequest.of(page, size,
                Sort.by("memberId").descending()), followerList.size());
    }

    @Override
    public Page<Member> getFolloweeList(int page, int size) {
        // LoginUser가 followerId로 저장되어 있는 리스트 불러오기. (getLoginUserId())
        List<Follow> followList = followRepository.findFollowListByFollowerId(loginUser.getMemberId());
        List<Member> followeeList = followList.stream()
                .map(following -> memberService.getMember(following.getFollowee().getMemberId()))
                .sorted(Comparator.comparingLong(Member::getMemberId).reversed())
                .collect(Collectors.toList());

        return new PageImpl<>(followeeList, PageRequest.of(page, size,
                Sort.by("memberId").descending()), followeeList.size());
    }

    @Override
    public void deleteFollow(Long followeeId) {
        Optional<Follow> obtainedFollow =
                followRepository.findByFollowerIdAndFolloweeId(loginUser.getMemberId(), followeeId);

        if (obtainedFollow.isEmpty())
            throw new LogicException(LogicExceptionCode.FOLLOW_NOT_FOUND);

        followRepository.delete(obtainedFollow.get());
    }

    @Override
    public void verifyIfFollowed(Long followeeId) {
        Optional<Follow> optionalFollow = followRepository.findByFolloweeId(followeeId);

        if (optionalFollow.isPresent())
            throw new LogicException(LogicExceptionCode.FOLLOW_ALREADY_EXISTS);
    }
}
