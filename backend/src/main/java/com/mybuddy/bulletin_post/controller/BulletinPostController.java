package com.mybuddy.bulletin_post.controller;

import com.mybuddy.amenity.dto.AmenityCreateDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.mapper.AmenityMapper;
import com.mybuddy.amenity.service.AmenityService;
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
    private final AmenityMapper amenityMapper;
    private final AmenityService amenityService;

    public BulletinPostController(BulletinPostService bulletinPostService, BulletinPostMapper bulletinPostMapper, AmenityMapper amenityMapper, AmenityService amenityService) {
        this.bulletinPostService = bulletinPostService;
        this.bulletinPostMapper = bulletinPostMapper;
        this.amenityMapper = amenityMapper;
        this.amenityService = amenityService;
    }

    @PostMapping
    public ResponseEntity postBulletinPost(@RequestPart BulletinPostDto.Create bulletinPostCreateDto, @RequestPart(value = "file") MultipartFile photoImage) {


//        member service 에서 로그인 멤버아이디 가져오는 메서드 가져오면 될듯!!
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        UserDetails userDetails = (UserDetails)principal;
//        long memberId = principal.getMemberId();


        //해당 amenity 저장되어있는지 여부 확인후 없으면 저장, 아니면 create 코드
        AmenityCreateDto amenityCreateDto = amenityMapper.BullletinPostCreateDtoToAmenityCreateDto(bulletinPostCreateDto);
        Amenity amenity = amenityService.findDBAmenity(amenityCreateDto);

        BulletinPost bulletinPost =
                bulletinPostService.createBulletinPost(bulletinPostMapper.bulletinPostCreateDtoToBulletinPost(bulletinPostCreateDto), amenity, photoImage);

        return new ResponseEntity<>(
                new ApiSingleResponse<>(HttpStatus.OK,"게시물이 생성되었습니다.",bulletinPostMapper.bulletinPostToBulletinPostResponseDto(bulletinPost)), HttpStatus.OK);
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity patchBulletinPost(@PathVariable("post-id") @Positive long bulletinPostId, @RequestBody BulletinPostDto.Patch bulletinPostPatchDto, @RequestPart(value = "file", required = false) MultipartFile photoImage) {

//        member service 에서 로그인 멤버아이디 가져오는 메서드 가져오면 될듯!!
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        UserDetails userDetails = (UserDetails)principal;
//        long memberId = principal.getMemberId();

        bulletinPostPatchDto.setBulletinPostId(bulletinPostId);

        //해당 amenity 저장되어있는지 여부 확인후 없으면 저장, 아니면 create 코드
        AmenityCreateDto amenityCreateDto = amenityMapper.BullletinPostPatchDtoToAmenityCreateDto(bulletinPostPatchDto);
        Amenity amenity = amenityService.findDBAmenity(amenityCreateDto);

        BulletinPost bulletinPost =
                bulletinPostService.updateBulletinPost(bulletinPostMapper.bulletinPostPatchDtoToBulletinPost(bulletinPostPatchDto), amenity, photoImage);


        return new ResponseEntity<>(
                new ApiSingleResponse<>(HttpStatus.OK,"게시물이 생성되었습니다.",bulletinPostMapper.bulletinPostToBulletinPostResponseDto(bulletinPost)), HttpStatus.OK);
    }


    @GetMapping("/{post-id}")
    public ResponseEntity getBulletinPost(
            @PathVariable("post-id") @Positive long bulletinPostId) {

        BulletinPost bulletinPost = bulletinPostService.findBulletinPost(bulletinPostId);

        return new ResponseEntity<>(
                new ApiSingleResponse<>(HttpStatus.OK, "message", bulletinPostMapper.bulletinPostToBulletinPostResponseDto(bulletinPost))
                , HttpStatus.OK);
    }

    //피드에서 bulletinPosts 리스트 가져오는 거
    @GetMapping("/feed")
    public ResponseEntity getBulletinPosts(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {

        Page<BulletinPost> pageBulletinPosts = bulletinPostService.findBulletinPosts(page - 1, size);
        List<BulletinPost> bulletinPosts = pageBulletinPosts.getContent();

        return new ResponseEntity<>(
                new ApiMultiResponse<>(HttpStatus.OK, "message", bulletinPostMapper.bulletinPostsToBulletinPostResponseForFeedDtos(bulletinPosts),
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
                new ApiMultiResponse<>(HttpStatus.OK, "message", bulletinPostMapper.bulletinPostsToBulletinPostResponseDtos(bulletinPosts),
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
