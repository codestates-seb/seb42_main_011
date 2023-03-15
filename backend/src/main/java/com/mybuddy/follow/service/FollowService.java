package com.mybuddy.follow.service;

import com.mybuddy.follow.entity.Follow;
import com.mybuddy.member.entity.Member;
import org.springframework.data.domain.Page;

public interface FollowService {

    Follow createFollow(Long followeeId);

    Page<Member> getFollowerList(int page, int size);

    Page<Member> getFolloweeList(int page, int size);

    void deleteFollow(Long followeeId);

    void verifyIfFollowed(Long followeeId);
}
