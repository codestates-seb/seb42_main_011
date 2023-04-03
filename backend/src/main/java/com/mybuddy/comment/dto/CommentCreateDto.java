package com.mybuddy.comment.dto;


import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@NoArgsConstructor
public class CommentCreateDto {

    private Long bulletinPostId;

    @NotNull
    @NotBlank(message = "공백이 아니어야 합니다.")
    @Size(min = 1, message = "1글자 이상 입력하세요.")
    private String commentContent;

    @Builder
    public CommentCreateDto(Long bulletinPostId, String commentContent) {
        this.bulletinPostId = bulletinPostId;
        this.commentContent = commentContent;
    }
}
