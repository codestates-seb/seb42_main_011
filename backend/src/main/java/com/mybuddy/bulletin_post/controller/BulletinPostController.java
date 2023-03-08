package com.mybuddy.bulletin_post.controller;

import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.mapper.BulletinPostMapper;
import com.mybuddy.bulletin_post.service.BulletinPostService;
import com.mybuddy.global.utils.ApiSingleResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/bulletin-posts")
@Validated
@Slf4j
public class BulletinPostController {

//    private final static String BULLETIN_POST_DEFAULT_URL = "/bulletin-posts";
//    private final BulletinPostService bulletinPostService;
//    private final BulletinPostMapper bulletinPostMapper;
//
//    public BulletinPostController(BulletinPostService bulletinPostService, BulletinPostMapper bulletinPostMapper) {
//        this.bulletinPostService = bulletinPostService;
//        this.bulletinPostMapper = bulletinPostMapper;
//    }
//
//    @PostMapping
//    public ResponseEntity postBulletinPost(@RequestPart BulletinPostDto.Post bulletinPostPostDto,
//                                           @RequestPart(value = "file") MultipartFile multipartFile) {
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        UserDetails userDetails = (UserDetails)principal;
//        long memberId = principal.getMemberId();



//        questionPatchDto.setQuestionId(questionId);
//
//        Question question =
//                questionService.updateQuestion(questionMapper.questionPatchDtoToQuestion(questionPatchDto));

//        return new ResponseEntity<>(
//                new ApiSingleResponse<>(HttpStatus.OK,"message",bulletinPostMapper.BulletinPostToBulletinPostResponseDto(bulletinPost)));
//    }

}
