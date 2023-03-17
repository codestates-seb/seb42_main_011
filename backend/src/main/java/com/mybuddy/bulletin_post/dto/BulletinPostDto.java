package com.mybuddy.bulletin_post.dto;

import com.mybuddy.comment.dto.CommentResponseDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

public class BulletinPostDto {

    @Getter
    public static abstract class InnerParent {
        private String postContent;
        private long addressId;
        private String amenityName;
        private String address;
        private double longitude;
        private double latitude;

        public InnerParent(String postContent, long addressId, String amenityName, String address, double longitude, double latitude) {
            this.postContent = postContent;
            this.addressId = addressId;
            this.amenityName = amenityName;
            this.address = address;
            this.longitude = longitude;
            this.latitude = latitude;
        }
    }

    @Getter
    @Setter
    public static class Create extends InnerParent {
        public Create(String postContent, long addressId, String amenityName, String address, double longitude, double latitude) {
            super(postContent, addressId, amenityName, address, longitude, latitude);
        }
    }

    @Getter
    @Setter
    public static class Patch extends InnerParent {
        private long bulletinPostId;

        @Builder
        public Patch(String postContent, long addressId, String amenityName, String address, double longitude, double latitude) {
            super(postContent, addressId, amenityName, address, longitude, latitude);
        }
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
        private int likeByUser;

        private List<CommentResponseDto> commentList;
        private long commentCount;

    }
    @Getter
    @Setter
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

        @Builder
        public ResponseForFeed(long bulletinPostId, String photoUrl, String postContent, long memberId, String nickname, String dogName, List<CommentResponseDto> commentList, long commentCount) {
            this.bulletinPostId = bulletinPostId;
            this.photoUrl = photoUrl;
            this.postContent = postContent;
            this.memberId = memberId;
            this.nickname = nickname;
            this.dogName = dogName;
            this.commentList = commentList;
            this.commentCount = commentCount;
        }
    }
}
