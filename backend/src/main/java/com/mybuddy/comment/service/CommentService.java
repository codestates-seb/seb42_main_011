package com.mybuddy.comment.service;


import com.mybuddy.comment.entity.Comment;
import com.mybuddy.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public Comment createComment(Comment comment) {

        //BulletinPost의 verfied 검증 로직 추가

        Comment createdComment = commentRepository.save(comment);

        return createdComment;
    }
    //
    public List<Comment> getCommentsByBulletinPostId(Long bulletinPostId) {

        //BulletinPost의 verfied 검증 로직 추가

        List<Comment> comments = commentRepository.findAll();
        //commentRepository.findByBulletinPostId(postId); 위는 정상적으로 작동하기 위한 findAll()이며, 이걸로 대체할 예정입니다.(2023.03.08 강지은)

        return comments;
    }

    public Comment updateComment(Comment updateComment) {

        //로그인한 사용자의 리소스인지 확인하는 로직 추가

        Comment comment = verifiedComment(updateComment.getCommentId());

        Optional.ofNullable(updateComment.getCommentContent())
                .ifPresent(content -> comment.updateContent(content));

        return comment;
    }
    public void deleteComment(Long commentId) {

        //로그인한 사용자의 리소스인지 확인하는 로직 추가

        verifiedComment(commentId);
        commentRepository.deleteById(commentId);
    }

    private Comment verifiedComment(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow( () -> new RuntimeException() );
    }
}
