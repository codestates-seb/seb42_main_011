package com.mybuddy.bulletin_post.controller;

import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.global.service.CompositeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.constraints.Positive;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/bulletin-posts")
@Validated
@Slf4j
public class BulletinPostController {

    private final CompositeService compositeService;

    public BulletinPostController(CompositeService compositeService) {
        this.compositeService = compositeService;
    }

    @PostMapping
    public ResponseEntity createBulletinPost(@RequestPart BulletinPostDto.Create createDto, @RequestPart MultipartFile photoImage, HttpServletRequest request) {

        Long loginUserId = (Long) request.getAttribute("loginUserId");

        return new ResponseEntity<>(compositeService.createBulletinPost(loginUserId, createDto, photoImage), HttpStatus.OK);
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity patchBulletinPost(@PathVariable("post-id") @Positive long postId, @RequestPart BulletinPostDto.Patch patchDto, @RequestPart(required = false) MultipartFile photoImage, HttpServletRequest request) {

        Long loginUserId = (Long) request.getAttribute("loginUserId");

        return new ResponseEntity<>(compositeService.patchBulletinPost( postId, loginUserId, patchDto, photoImage), HttpStatus.OK);
    }


    @GetMapping("/{post-id}")
    public ResponseEntity getBulletinPost(
            @PathVariable("post-id") @Positive long postId) {

        return new ResponseEntity<>(compositeService.getBulletinPost(postId), HttpStatus.OK);
    }

    //피드에서 bulletinPosts 리스트 가져오는 거
    @GetMapping("/feed")
    public ResponseEntity getBulletinPosts(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size, HttpServletRequest request) {
//        Optional<Long> loginUserId = Optional.ofNullable((Long) request.getAttribute("loginUserId"));
        Long loginUserId = (Long) request.getAttribute("loginUserId");

        return new ResponseEntity<>(compositeService.getBulletinPostsFeed(loginUserId, page, size), HttpStatus.OK);
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity deleteBulletinPost(
            @PathVariable("post-id") @Positive long postId, HttpServletRequest request) {

        Long loginUserId = (Long) request.getAttribute("loginUserId");
        compositeService.deleteBulletinPost(postId, loginUserId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{post-id}/likes")
    public ResponseEntity createLike(@PathVariable("post-id") @Positive long postId, HttpServletRequest request) {

        Long loginUserId = (Long) request.getAttribute("loginUserId");

        return new ResponseEntity<>(compositeService.createLike(postId, loginUserId), HttpStatus.OK);
    }

    @DeleteMapping("/{post-id}/likes")
    public ResponseEntity deleteLike(
            @PathVariable("post-id") @Positive long postId, HttpServletRequest request) {

        Long loginUserId = (Long) request.getAttribute("loginUserId");

        return new ResponseEntity<>(compositeService.deleteLike(postId, loginUserId), HttpStatus.OK);
    }

}
