package com.mybuddy.like.dto;

import lombok.Getter;


//갯수만 가져오는 response dto로?
@Getter
public class LikeResponseDto {

    private final long likeCount;

    public LikeResponseDto(long likeCount) {
        this.likeCount = likeCount;
    }
}


