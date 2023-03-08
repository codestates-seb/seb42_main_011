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
                .commentContent(commentCreateDto.commentContent)
                .build();
    }
    default Comment CommentUpdateDtoToComment(CommentUpdateDto commentUpdateDto) {

        if ( commentUpdateDto == null )
            return null;

        return Comment
                .UpdateComment()
                .commentId(commentUpdateDto.commentId)
                .commentContent(commentUpdateDto.getCommentContent())
                .build();

    }
    CommentResponseDto CommentToCommentResponseDto(Comment comment);
    List<CommentResponseDto> CommentListToCommentResponseDtoList(List<Comment> commentList);
}

