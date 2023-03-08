package com.mybuddy.comment.repository;

public interface CommentCustomRepository {
    void findByBulletinPostId(Long bulletinPostId);
}
