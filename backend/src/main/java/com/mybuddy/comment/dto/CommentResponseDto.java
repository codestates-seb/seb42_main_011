package com.mybuddy.comment.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentResponseDto {
    private String commentContent ;
    private Long memberId;
    private String nickName;
    private String dogName;

    @Builder
    public CommentResponseDto(String commentContent, Long memberId, String nickName, String dogName) {
        this.commentContent = commentContent;
        this.memberId = memberId;
        this.nickName = nickName;
        this.dogName = dogName;
    }
    */
}
