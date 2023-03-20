package com.mybuddy.comment.controller;

import com.mybuddy.comment.dto.CommentCreateDto;
import com.mybuddy.comment.dto.CommentResponseDto;
import com.mybuddy.comment.dto.CommentUpdateDto;
import com.mybuddy.comment.entity.Comment;
import com.mybuddy.comment.mapper.CommentMapper;
import com.mybuddy.comment.service.CommentService;
import com.mybuddy.global.utils.ApiSingleResponse;
import com.mybuddy.global.utils.UriMaker;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper commentMapper;

    private static final String COMMENT_DEFAULT_URL = "/api/v1/comments";

    @PostMapping
    public ResponseEntity<ApiSingleResponse> createComment(@Valid @RequestBody CommentCreateDto commentCreateDto,
                                                           HttpServletRequest request) {

        Long loginUserId = (Long) request.getAttribute("loginUserId");
        Long bulletinPostId = commentCreateDto.getBulletinPostId();

        Comment comment = commentService.createComment(loginUserId, bulletinPostId ,commentMapper.commentCreateDtoToComment(commentCreateDto));
        URI uri = UriMaker.getUri(COMMENT_DEFAULT_URL, comment.getCommentId());
        CommentResponseDto commentResponseDto = commentMapper.commentToCommentResponseDto(comment);
        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.CREATED,"댓글이 생성되었습니다", commentResponseDto);
        return ResponseEntity.created(uri).body(response);
    }

    @PatchMapping("{comment-id}")
    public ResponseEntity<ApiSingleResponse> updateComment(@PathVariable("comment-id") @Positive Long commentId,
                                                           @Valid @RequestBody CommentUpdateDto commentUpdateDto,
                                                           HttpServletRequest request) {

        Long loginUserId = (Long) request.getAttribute("loginUserId");

        commentUpdateDto.setCommentId(commentId);
        Comment updatedComment = commentService.updateComment(loginUserId, commentMapper.commentUpdateDtoToComment(commentUpdateDto));
        CommentResponseDto commentResponseDto = commentMapper.commentToCommentResponseDto(updatedComment);

        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.OK,"댓글이 수정되었습니다", commentResponseDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive  Long commentId,
                                        HttpServletRequest request) {

        Long loginUserId = (Long) request.getAttribute("loginUserId");

        commentService.deleteComment(loginUserId, commentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
