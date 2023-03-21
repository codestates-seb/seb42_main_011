package com.mybuddy.search.controller;

import com.mybuddy.global.service.CompositeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/search")
@Validated
@Slf4j
public class SearchController {

    private final CompositeService compositeService;

    @GetMapping
    public ResponseEntity getMembersByNameType(@RequestParam String type,
                                               @RequestParam String name,
                                               @Positive @RequestParam int page,
                                               @Positive @RequestParam int size) {

        return new ResponseEntity<>(compositeService.searchMembersByName(type, name, page, size), HttpStatus.OK);
    }

}
