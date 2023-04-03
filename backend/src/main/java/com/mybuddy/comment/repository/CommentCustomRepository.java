package com.mybuddy.comment.repository;

import com.mybuddy.comment.entity.Comment;

import java.util.List;

public interface CommentCustomRepository {
    List<Comment> findByBulletinPostId(Long bulletinPostId);
}
