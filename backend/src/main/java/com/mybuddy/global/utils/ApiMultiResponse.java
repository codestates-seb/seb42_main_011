package com.mybuddy.global.utils;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class ApiMultiResponse<T> {

    private List<T> data;
    private PageInfo pageInfo;

    public ApiMultiResponse(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());

    }
}
