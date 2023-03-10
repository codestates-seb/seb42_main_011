package com.mybuddy.bulletin_post.controller;

import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.mapper.BulletinPostMapper;
import com.mybuddy.bulletin_post.service.BulletinPostService;
import com.mybuddy.global.utils.ApiMultiResponse;
import com.mybuddy.global.utils.ApiSingleResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/bulletin-posts")
@Validated
@Slf4j
public class BulletinPostController {

//    private final static String BULLETIN_POST_DEFAULT_URL = "/bulletin-posts"; 필요 없는데..?
    private final BulletinPostService bulletinPostService;
    private final BulletinPostMapper bulletinPostMapper;

    public BulletinPostController(BulletinPostService bulletinPostService, BulletinPostMapper bulletinPostMapper) {
        this.bulletinPostService = bulletinPostService;
        this.bulletinPostMapper = bulletinPostMapper;
    }

    @PostMapping
    public ResponseEntity postBulletinPost(@RequestBody BulletinPostDto.Create bulletinPostCreateDto) {
        //@RequestPart BulletinPostDto.Create bulletinPostCreateDto, @RequestPart(value = "file") MultipartFile multipartFile 추후 추가

//        principal 에서 memberId 가져오기
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        UserDetails userDetails = (UserDetails)principal;
//        long memberId = principal.getMemberId();


//        image 저장시 밑의 걸로 바꿔줘야함
        BulletinPost bulletinPost =
                bulletinPostService.createBulletinPost(bulletinPostMapper.bulletinPostCreateDtoToBulletinPost(bulletinPostCreateDto));
//        BulletinPost bulletinPost =
//                bulletinPostService.createBulletinPost(bulletinPostMapper.bulletinPostCreateDtoToBulletinPost(bulletinPostCreateDto),multipartFile);

        return new ResponseEntity<>(
                new ApiSingleResponse<>(HttpStatus.OK,"message",bulletinPostMapper.BulletinPostToBulletinPostResponseDto(bulletinPost)), HttpStatus.OK);
    }
    @PatchMapping("/{post-id}")
    public ResponseEntity patchBulletinPost(@PathVariable("post-id") @Positive long bulletinPostId, @RequestBody BulletinPostDto.Patch bulletinPostPatchDto) {
        //@RequestPart BulletinPostDto.Patch bulletinPostPatchDto, @RequestPart(value = "file") MultipartFile multipartFile 추후 추가

//        principal 에서 memberId 가져오기
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        UserDetails userDetails = (UserDetails)principal;
//        long memberId = principal.getMemberId();

        bulletinPostPatchDto.setBulletinPostId(bulletinPostId);

//        image 저장시 밑의 걸로 바꿔줘야함
        BulletinPost bulletinPost =
                bulletinPostService.updateBulletinPost(bulletinPostMapper.bulletinPostPatchDtoToBulletinPost(bulletinPostPatchDto));
//        BulletinPost bulletinPost =
//                bulletinPostService.createBulletinPost(bulletinPostMapper.bulletinPostPatchDtoToBulletinPost(bulletinPostPatchDto),multipartFile);

        return new ResponseEntity<>(
                new ApiSingleResponse<>(HttpStatus.OK,"message",bulletinPostMapper.BulletinPostToBulletinPostResponseDto(bulletinPost)), HttpStatus.OK);
    }


    @GetMapping("/{post-id}")
    public ResponseEntity getBulletinPost(
            @PathVariable("post-id") @Positive long bulletinPostId) {

        BulletinPost bulletinPost = bulletinPostService.findBulletinPost(bulletinPostId);

        return new ResponseEntity<>(
                new ApiSingleResponse<>(HttpStatus.OK, "message",bulletinPostMapper.BulletinPostToBulletinPostResponseDto(bulletinPost))
                , HttpStatus.OK);
    }

    //피드에서 bulletinPosts 리스트 가져오는 거
    @GetMapping("/feed")
    public ResponseEntity getBulletinPosts(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {

        Page<BulletinPost> pageBulletinPosts = bulletinPostService.findBulletinPosts(page - 1, size);
        List<BulletinPost> bulletinPosts = pageBulletinPosts.getContent();
        return new ResponseEntity<>(
                new ApiMultiResponse<>(bulletinPostMapper.bulletinPostsToBulletinPostResponseForFeedDtos(bulletinPosts),
                        pageBulletinPosts),
                HttpStatus.OK);
    }

    //마이페이지에서 bulletinPosts 리스트 가져오는 거
    @GetMapping
    public ResponseEntity getBulletinPostsByMemberId(@Positive @RequestParam long memberId, @Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {

        Page<BulletinPost> pageBulletinPosts = bulletinPostService.findBulletinPostsByMemberId(memberId, page - 1, size);
        List<BulletinPost> bulletinPosts = pageBulletinPosts.getContent();
        return new ResponseEntity<>(
                new ApiMultiResponse<>(bulletinPostMapper.bulletinPostsToBulletinPostResponseDtos(bulletinPosts),
                        pageBulletinPosts),
                HttpStatus.OK);
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity deleteBulletinPost(
            @PathVariable("post-id") @Positive long bulletinPostId) {
        bulletinPostService.deleteBulletinPost(bulletinPostId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
