package com.mybuddy.follow.repository;

import com.mybuddy.follow.entity.Follow;

import java.util.List;
import java.util.Optional;

public interface FollowCustomRepository {

    Optional<Follow> findByFolloweeId(Long followeeId);

    Optional<Follow> findByFollowerIdAndFolloweeId(Long followerId, Long followeeId);

    List<Follow> findFollowListByFolloweeId(Long followeeId);

    List<Follow> findFollowListByFollowerId(Long followerId);
}
