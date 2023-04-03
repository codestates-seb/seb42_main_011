package com.mybuddy.like.repository;

import com.mybuddy.like.entity.Like;
import com.mybuddy.like.entity.QLike;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
public class LikeCustomRepositoryImpl implements LikeCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<Like> findByPostAndMemberId(long postId, Long memberId) {

        QLike like = QLike.like;

        return Optional.ofNullable(queryFactory
                .selectFrom(like)
                .where(like.bulletinPost.bulletinPostId.eq(postId)
                        .and(like.member.memberId.eq(memberId)))
                .fetchOne()
        );
    }

}
