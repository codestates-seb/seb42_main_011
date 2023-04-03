package com.mybuddy.follow.service;

import com.mybuddy.follow.entity.Follow;
import com.mybuddy.member.entity.Member;
import org.springframework.data.domain.Page;

public interface FollowService {

    Follow createFollow(Long followeeId, Long loginUserId);

    Page<Member> getFollowerList(int page, int size, Long loginUserId);

    Page<Member> getFolloweeList(int page, int size, Long loginUserId);

    void deleteFollow(Long followeeId, Long loginUserId);

    void verifyIfFollowed(Long followeeId, Long loginUserId);
}
