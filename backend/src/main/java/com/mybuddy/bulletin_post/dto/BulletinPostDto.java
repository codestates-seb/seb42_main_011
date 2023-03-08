package com.mybuddy.bulletin_post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.util.Assert;

import javax.validation.constraints.NotBlank;

public class BulletinPostDto {
//    @Getter
//    @AllArgsConstructor
//    public static class Post {
//
//        private long amenityId;
//
//        @NotBlank(message = "사진을 업로드 해주세요.")
//        private String photoUrl;
//
//        private String postContent;
//
//    }
//
//    @Getter
//    @AllArgsConstructor
//    public static class Patch {
//        private long memberId;
//
//        @NotSpace(message = "회원 이름은 공백이 아니어야 합니다")
//        private String name;
//
//        @NotSpace(message = "휴대폰 번호는 공백이 아니어야 합니다")
//        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
//                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다")
//        private String phone;
//
//        private Member.MemberStatus memberStatus;
//
//        public Patch addMemberId(Long memberId) {
//            Assert.notNull(memberId, "member id must not be null.");
//            this.memberId = memberId;
//
//            return this;
//        }
//    }
//
//    @AllArgsConstructor
//    @Getter
//    public static class Response {
//        private long memberId;
//        private String email;
//        private String name;
//        private String phone;
//        private Member.MemberStatus memberStatus;
//        private int stampCount;
//    }

}
