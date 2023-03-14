package com.mybuddy.bulletin_post.dto;

import com.mybuddy.bulletin_post.service.BulletinPostService;
import com.mybuddy.comment.dto.CommentResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class BulletinPostDto {


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
    public static class Response {

        private long bulletinPostId;
        private String photoUrl;
        private String postContent;
        private LocalDateTime createdAt;

        private long memberId;
        private String nickname;
        private String dogName;
        private String profileUrl;

        private long amenityId;
        private String amenityName;

        private long likeCount;
        private int likeChosen;

        private List<CommentResponseDto> commentList;
        private long commentCount;

    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ResponseForFeed {

        private long bulletinPostId;
        private String photoUrl;
        private String postContent;

        private long memberId;
        private String nickname;
        private String dogName;

        private List<CommentResponseDto> commentList;
        private long commentCount;

    }

}
