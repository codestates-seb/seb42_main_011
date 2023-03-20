package com.mybuddy.bulletin_post.dto;

import com.mybuddy.comment.dto.CommentResponseDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

public class BulletinPostDto {

    //이 부모 클래스도 final 붙이면.. 안될거같은데!?

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
    public static class Create extends InnerParent {

        @Builder
        public Create(String postContent, long addressId, String amenityName, String address, double longitude, double latitude) {
            super(postContent, addressId, amenityName, address, longitude, latitude);
        }
    }

    @Getter
    public static class Patch extends InnerParent {

        @Setter
        private long bulletinPostId;

        @Builder
        public Patch(String postContent, long addressId, String amenityName, String address, double longitude, double latitude) {
            super(postContent, addressId, amenityName, address, longitude, latitude);
        }
    }

    @Getter
    public static class Response {

        private final long bulletinPostId;
        private final String photoUrl;
        private final String postContent;
        private final LocalDateTime createdAt;

        private final long memberId;
        private final String nickname;
        private final String dogName;
        private final String profileUrl;

        private final long amenityId;
        private final String amenityName;

        private final long likeCount;
        private final int likeByUser;

        private final List<CommentResponseDto> commentList;
        private final long commentCount;

        @Builder
        public Response(long bulletinPostId, String photoUrl, String postContent, LocalDateTime createdAt, long memberId, String nickname, String dogName, String profileUrl, long amenityId, String amenityName, long likeCount, int likeByUser, List<CommentResponseDto> commentList, long commentCount) {
            this.bulletinPostId = bulletinPostId;
            this.photoUrl = photoUrl;
            this.postContent = postContent;
            this.createdAt = createdAt;
            this.memberId = memberId;
            this.nickname = nickname;
            this.dogName = dogName;
            this.profileUrl = profileUrl;
            this.amenityId = amenityId;
            this.amenityName = amenityName;
            this.likeCount = likeCount;
            this.likeByUser = likeByUser;
            this.commentList = commentList;
            this.commentCount = commentCount;
        }
    }
    @Getter
    public static class ResponseForFeed {

        private final long bulletinPostId;
        private final String photoUrl;
        private final String postContent;

        private final long memberId;
        private final String nickname;
        private final String dogName;

        private final List<CommentResponseDto> commentList;
        private final long commentCount;

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
