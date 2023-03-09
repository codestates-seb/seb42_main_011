package com.mybuddy.global.exception;

import lombok.Getter;

public class LogicException extends RuntimeException {

    @Getter
    private LogicExceptionCode exceptionCode;

    public LogicException(LogicExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
