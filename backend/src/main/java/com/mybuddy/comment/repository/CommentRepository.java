package com.mybuddy.comment.repository;

import com.mybuddy.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long>, CommentCustomRepository{
}

