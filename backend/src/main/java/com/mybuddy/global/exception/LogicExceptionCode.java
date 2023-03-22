package com.mybuddy.global.exception;

import lombok.Getter;

public enum LogicExceptionCode {

    // 401 unauthorized : 클라이언트 요청이 전달되지 않음 (인증 부족- token)
    MEMBER_UNAUTHORIZED(401, "Member Unauthorized"),

    // 403 forbidden : 서버에 요청 전달되었지만, 권한이 없음
    FOLLOW_NOT_POSSIBLE(403, "You cannot follow yourself"),
    LIKE_NOT_POSSIBLE(403, "You've already liked it"),
    CANCEL_LIKE_NOT_POSSIBLE(403, "You've not pressed 'Like' before"),
    NOT_RESOURCE_OWNER(403, "You are not a resource owner"),


    //404 not found
    MEMBER_NOT_FOUND(404, "Member not found"),
    BULLETIN_POST_NOT_FOUND(404, "Post not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    AMENITY_NOT_FOUND(404,"Amenity not found"),
    FOLLOW_NOT_FOUND(404, "Follow data not found"),
    TYPE_NOT_FOUND(404, "Type not found"),


    // 409 conflict : 서버의 현재 상태와 요청이 충돌
    MEMBER_ALREADY_EXISTS(409, "Member already exists"),
    NICKNAME_ALREADY_EXISTS(409, "Nickname already exists"),
    FOLLOW_ALREADY_EXISTS(409, "Follow data already exists");


    @Getter
    private int status;

    @Getter
    private String message;

    LogicExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
