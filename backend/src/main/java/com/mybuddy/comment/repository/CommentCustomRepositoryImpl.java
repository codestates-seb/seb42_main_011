package com.mybuddy.comment.repository;

import com.mybuddy.bulletin_post.entity.QBulletinPost;
import com.mybuddy.comment.entity.Comment;
import com.mybuddy.comment.entity.QComment;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class CommentCustomRepositoryImpl implements CommentCustomRepository{

    private final JPAQueryFactory queryFactory;
    @Override
    public List<Comment> findByBulletinPostId(Long bulletinPostId) {
        QComment comment = QComment.comment;
        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;

        return queryFactory.select(comment)
                .from(comment)
                .join(comment.bulletinPost, bulletinPost)
                .where(comment.bulletinPost.bulletinPostId.eq(bulletinPostId))
                .orderBy(comment.commentId.desc())
                .fetch();
    }
}
