package com.mybuddy.bulletin_post.dto;

import com.mybuddy.bulletin_post.service.BulletinPostService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class BulletinPostDto {

    private static BulletinPostService bulletinPostService;

    public BulletinPostDto(BulletinPostService bulletinPostService) {
        this.bulletinPostService = bulletinPostService;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Create {

        private String postContent;

        private long addressId;

        private String amenityName;

        private String address;

        private double longitude;

        private double latitude;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {

        private long bulletinPostId;
        private String postContent;

//        private long addressId;
//
//        private String amenityName;
//
//        private String address;
//
//        private double longitude;
//
//        private double latitude;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {

        private long bulletinPostId;
        private String photoUrl;
        private String postContent;
        private LocalDateTime createdAt;

//        private long memberId;
//        private String nickname;
//        private String dogName;
//        private String profileUrl;
//
//        private long amenityId;
//        private String amenityName;

//        private long likeCount;
//        private int likeChosen;


//        private List<CommentResponseDto> commentList;
//        private long commentCount = commentList.size();

    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResponseForFeed {

        private long bulletinPostId;
        private String photoUrl;
        private String postContent;

//        private long memberId;
//        private String nickname;
//        private String dogName;


//        Feed용 Single Response는 댓글 가져오지 않고 댓글 수만 가져오므로 이게 맞나.
//        private long commentCount = bullentinPostService.getCommentCount(bulletinPostId);

//        private List<CommentResponseDto> commentList;
//        private long commentCount = commentList.size();

    }

}
