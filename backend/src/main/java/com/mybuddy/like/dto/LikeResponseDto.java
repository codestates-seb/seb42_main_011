package com.mybuddy.like.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


//갯수만 가져오는 response dto로?
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LikeResponseDto {

    private long likeCount;

}


