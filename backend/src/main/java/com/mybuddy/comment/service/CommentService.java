package com.mybuddy.comment.service;


import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.repository.BulletinPostRepository;
import com.mybuddy.comment.entity.Comment;
import com.mybuddy.comment.repository.CommentRepository;
import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.exception.LogicExceptionCode;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    private final MemberRepository memberRepository;
    private final BulletinPostRepository bulletinPostRepository;

    @Transactional
    public Comment createComment(Long loginUserId, Long bulletinPostId, Comment comment) {

        Member writer = memberRepository.findById(loginUserId).orElseThrow(()->new LogicException(LogicExceptionCode.MEMBER_NOT_FOUND));
        comment.setMember(writer);

        BulletinPost bulletinPost = bulletinPostRepository.findById(bulletinPostId).orElseThrow(()-> new LogicException(LogicExceptionCode.BULLETIN_POST_NOT_FOUND));
        comment.setBulletinPost(bulletinPost);

        Comment createdComment = commentRepository.save(comment);
        return createdComment;
    }

    @Transactional
    public List<Comment> getCommentsByBulletinPostId(Long bulletinPostId) {

        bulletinPostRepository.findById(bulletinPostId).orElseThrow(
                ()-> new LogicException(LogicExceptionCode.BULLETIN_POST_NOT_FOUND));

        List<Comment> comments = commentRepository.findByBulletinPostId(bulletinPostId);

        return comments;
    }

    @Transactional
    public Comment updateComment(Long loginUserId, Comment updateComment) {

        Comment comment = verifiedComment(updateComment.getCommentId());

        verifyResourceOwner(comment, loginUserId);

        Optional.ofNullable(updateComment.getCommentContent())
                .ifPresent(content -> comment.updateContent(content));

        return comment;
    }

    @Transactional
    public void deleteComment(Long loginUserId, Long commentId) {

        Comment foundComment = verifiedComment(commentId);

        verifyResourceOwner(foundComment, loginUserId);

        commentRepository.deleteById(commentId);
    }

    private Comment verifiedComment(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow( () -> new LogicException(LogicExceptionCode.COMMENT_NOT_FOUND));
    }

    private void verifyResourceOwner(Comment comment, Long loginUserId) {
        if (!comment.getMember().getMemberId().equals(loginUserId))
            throw new LogicException(LogicExceptionCode.NOT_RESOURCE_OWNER);
    }
}
