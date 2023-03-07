package com.mungfluencer.global.utils;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;



@NoArgsConstructor
@Getter
public class ApiSingleResponse<T> {
    private String code;
    private String message;
    private T data;

    public ApiSingleResponse(HttpStatus status, String message) {
        this.code = String.valueOf(status.value());
        this.message = message;
    }

    public ApiSingleResponse(HttpStatus status, String message, @Nullable T data) {
        this(status, message);
        this.data = data;
    }
}
