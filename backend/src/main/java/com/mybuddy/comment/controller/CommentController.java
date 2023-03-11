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

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper commentMapper;

    private final static String defaultUrl = "/api/v1/comments";

    @PostMapping
    public ResponseEntity<ApiSingleResponse> createComment(@Valid @RequestBody CommentCreateDto commentCreateDto) {

        Long bulletinPostId = commentCreateDto.getBulletinPostId();

        Comment comment = commentService.createComment(bulletinPostId ,commentMapper.CommentCreateDtoToComment(commentCreateDto));
        URI uri = UriMaker.getUri(defaultUrl, comment.getCommentId());
        CommentResponseDto commentResponseDto = commentMapper.CommentToCommentResponseDto(comment);
        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.CREATED,"댓글이 생성되었습니다", commentResponseDto);
        return ResponseEntity.created(uri).body(response);
    }

    //게시물에 딸려 정보가 응답되므로 없어질 가능성이 큽니다. (2023.03.08 강지은)
    @GetMapping
    public ResponseEntity<ApiSingleResponse> getComments(@RequestParam(name = "bulletinPostId") @Positive Long postId) {
        //bulletinPost 엔티티 생성후 제작
        List<Comment> commentList = commentService.getCommentsByBulletinPostId(postId);
        List<CommentResponseDto> commentResponseDtos = commentMapper.CommentListToCommentResponseDtoList(commentList);

        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.OK,"게시물에 해당하는 댓글 정보입니다.", commentResponseDtos);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("{comment-id}")
    public ResponseEntity<ApiSingleResponse> updateComment(@PathVariable("comment-id") @Positive Long commentId,
                                                           @Valid @RequestBody CommentUpdateDto commentUpdateDto) {

        commentUpdateDto.setCommentId(commentId);
        Comment updatedComment = commentService.updateComment(commentMapper.CommentUpdateDtoToComment(commentUpdateDto));
        CommentResponseDto commentResponseDto = commentMapper.CommentToCommentResponseDto(updatedComment);

        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.OK,"댓글이 수정되었습니다", commentResponseDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive  Long commentId) {
        commentService.deleteComment(commentId);
//        return ResponseEntity.noContent();
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
