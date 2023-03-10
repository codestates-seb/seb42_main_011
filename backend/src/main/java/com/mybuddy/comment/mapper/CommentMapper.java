package com.mybuddy.comment.mapper;

import com.mybuddy.comment.dto.CommentCreateDto;
import com.mybuddy.comment.dto.CommentResponseDto;
import com.mybuddy.comment.dto.CommentUpdateDto;
import com.mybuddy.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    default Comment CommentCreateDtoToComment(CommentCreateDto commentCreateDto){
        if ( commentCreateDto == null )
            return null;

        return Comment
                .CreateNewComment()
                .commentContent(commentCreateDto.getCommentContent())
                .build();
    }
    default Comment CommentUpdateDtoToComment(CommentUpdateDto commentUpdateDto) {

        if ( commentUpdateDto == null )
            return null;

        return Comment
                .UpdateComment()
                .commentId(commentUpdateDto.getCommentId())
                .commentContent(commentUpdateDto.getCommentContent())
                .build();

    }

    default CommentResponseDto CommentToCommentResponseDto(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        CommentResponseDto commentResponseDto = CommentResponseDto
                .builder()
                .commentContent(comment.getCommentContent())
                .dogName(comment.getMember().getDogName())
                .memberId(comment.getMember().getMemberId())
                .nickName(comment.getMember().getNickname())
                .build();

        return commentResponseDto;
    }

    List<CommentResponseDto> CommentListToCommentResponseDtoList(List<Comment> commentList);
}

