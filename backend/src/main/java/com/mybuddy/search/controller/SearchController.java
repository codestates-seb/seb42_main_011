package com.mybuddy.search.controller;

import com.mybuddy.global.utils.ApiMultiResponse;
import com.mybuddy.member.entity.Member;
import com.mybuddy.search.mapper.SearchMapper;
import com.mybuddy.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/search")
@Validated
@Slf4j
public class SearchController {

    private final SearchService searchService;
    private final SearchMapper searchMapper;

    @GetMapping
    public ResponseEntity getMembersByNameType(@RequestParam String type,
                                               @RequestParam String name,
                                               @Positive @RequestParam int page,
                                               @Positive @RequestParam int size) {

        Page<Member> pageMembers = searchService.findByNameType(type, page - 1, size, name);
        List<Member> members = pageMembers.getContent();

        return new ResponseEntity<>(
                new ApiMultiResponse<>(HttpStatus.OK, "해당 타입의 검색 결과를 조회합니다.", searchMapper.membersToSearchResponseDtos(members),
                        pageMembers),
                HttpStatus.OK);
    }

}
