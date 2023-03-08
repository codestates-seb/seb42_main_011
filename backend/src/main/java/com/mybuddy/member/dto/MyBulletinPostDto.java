package com.mybuddy.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MyBulletinPostDto {

    private Long bulletinPostId;

    private String photoUrl;

    @Builder
    public MyBulletinPostDto(Long bulletinPostId, String photoUrl) {
        this.bulletinPostId = bulletinPostId;
        this.photoUrl = photoUrl;
    }
}
