package com.mybuddy.comment.repository;

import com.mybuddy.comment.entity.QComment;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CommentCustomRepositoryImpl implements CommentCustomRepository{

    private final JPAQueryFactory queryFactory;
    @Override
    public void findByBulletinPostId(Long bulletinPostId) {
        QComment c = new QComment("c");
//        queryFactory.select(c)
    }
}
