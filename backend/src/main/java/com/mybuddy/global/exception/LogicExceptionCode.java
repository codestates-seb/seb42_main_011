package com.mybuddy.global.exception;

import lombok.Getter;

public enum LogicExceptionCode {

    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_ALREADY_EXISTS(409, "Member already exists"),
    NICKNAME_ALREADY_EXISTS(409, "Nickname already exists"),
    MEMBER_UNAUTHORIZED(401, "Member Unauthorized"),
    BULLETIN_POST_NOT_FOUND(404, "Post not found"),
    COMMENT_NOT_FOUND(404, "Comment not found");


    @Getter
    private int status;

    @Getter
    private String message;

    LogicExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
