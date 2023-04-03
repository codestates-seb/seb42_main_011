package com.mybuddy.comment.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentResponseDto {

    private Long commentId;
    private String commentContent ;
    private Long memberId;
    private String nickName;
    private String dogName;
    private String profileUrl;

    @Builder
    public CommentResponseDto(Long commentId, String commentContent, Long memberId, String nickName, String dogName, String profileUrl) {
        this.commentId = commentId;
        this.commentContent = commentContent;
        this.memberId = memberId;
        this.nickName = nickName;
        this.dogName = dogName;
        this.profileUrl = profileUrl;
    }

}
