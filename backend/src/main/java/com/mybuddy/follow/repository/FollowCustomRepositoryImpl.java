package com.mybuddy.follow.repository;

import com.mybuddy.follow.entity.Follow;
import com.mybuddy.follow.entity.QFollow;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class FollowCustomRepositoryImpl implements FollowCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<Follow> findByFolloweeIdAndFollowerId(Long followeeId, Long followerId) {
        QFollow follow = QFollow.follow;

        return Optional.ofNullable(
                queryFactory
                        .select(follow)
                        .from(follow)
                        .where(follow.followee.memberId.eq(followeeId)
                                .and(follow.follower.memberId.eq(followerId)))
                        .fetchOne()
        );
    }

    @Override
    public List<Follow> findFollowListByFolloweeId(Long followeeId) {
        QFollow follow = QFollow.follow;

        return queryFactory
                .selectFrom(follow)
                .where(follow.followee.memberId.eq(followeeId))
                .fetch();
    }

    @Override
    public List<Follow> findFollowListByFollowerId(Long followerId) {
        QFollow follow = QFollow.follow;

        return queryFactory
                .selectFrom(follow)
                .where(follow.follower.memberId.eq(followerId))
                .fetch();
    }
}
