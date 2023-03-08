package com.mybuddy.comment.dto;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
public class CommentUpdateDto {

    @Setter
    public Long commentId;
    @NotNull
    @NotBlank(message = "공백이 아니어야 합니다.")
    @Size(min = 1, message = "1글자 이상 입력하세요.")
    public String commentContent;

}
