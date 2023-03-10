package com.mybuddy.global.utils;

import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

import java.util.List;

@Getter
public class ApiMultiResponse<T> {

    private String code;
    private String message;
    private List<T> data;
    private PageInfo pageInfo;

    public ApiMultiResponse(HttpStatus status, String message,List<T> data, Page page) {
        this(status, message);
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());

    }

    public ApiMultiResponse(HttpStatus status, String message) {
        this.code = String.valueOf(status.value());
        this.message = message;
    }

}
