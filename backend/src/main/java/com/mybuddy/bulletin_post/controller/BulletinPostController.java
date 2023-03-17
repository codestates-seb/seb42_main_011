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
import com.mybuddy.like.dto.LikeResponseDto;
import com.mybuddy.like.entity.Like;
import com.mybuddy.like.mapper.LikeMapper;
import com.mybuddy.like.service.LikeService;
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
@RequestMapping("/api/v1/bulletin-posts")
@Validated
@Slf4j
public class BulletinPostController {

    private final BulletinPostService bulletinPostService;
    private final LikeService likeService;
    private final BulletinPostMapper bulletinPostMapper;
    private final AmenityMapper amenityMapper;
    private final AmenityService amenityService;
    private final LikeMapper likeMapper;



    //requiredArgsConstructor 쓰면 안되나?


    public BulletinPostController(BulletinPostService bulletinPostService, LikeService likeService, BulletinPostMapper bulletinPostMapper, AmenityMapper amenityMapper, AmenityService amenityService, LikeMapper likeMapper) {
        this.bulletinPostService = bulletinPostService;
        this.likeService = likeService;
        this.bulletinPostMapper = bulletinPostMapper;
        this.amenityMapper = amenityMapper;
        this.amenityService = amenityService;
        this.likeMapper = likeMapper;
    }

    @PostMapping
    public ResponseEntity createBulletinPost(@RequestPart BulletinPostDto.Create createDto, @RequestPart MultipartFile photoImage) {


//        member service 에서 로그인 멤버아이디 가져오는 메서드 가져오면 될듯!!
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        UserDetails userDetails = (UserDetails)principal;
//        long memberId = principal.getMemberId();


        //해당 amenity 저장되어있는지 여부 확인후 없으면 저장, 아니면 create 코드
        //이 로직이 컨트롤러에 잇는게 맞나 싶은데 patch도 마찬가지고.. bulletinPostToAmentiyCreateDto로 변경해서 bulletinpost 서비스 단에서 해결해도 되지 않나? 그럼 서비스메서드 파라미터도 줄고 간단해질텐데, 매핑도 수정하는게 어렵지 않고.. 이걸 수정하면 dto를 묶을 필요가 없엇을지도..
        AmenityCreateDto amenityCreateDto = amenityMapper.bulletinPostDtoToAmenityCreateDto(createDto);
        Amenity amenity = amenityService.findDBAmenity(amenityCreateDto);


        BulletinPost bulletinPost =
                bulletinPostService.createBulletinPost(bulletinPostMapper.bulletinPostCreateDtoToBulletinPost(createDto), amenity, photoImage);

        return new ResponseEntity<>(
                new ApiSingleResponse<>(HttpStatus.OK,"게시물이 생성되었습니다.",bulletinPostMapper.bulletinPostToBulletinPostResponseDto(bulletinPost,bulletinPostService, likeService)), HttpStatus.OK);
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity patchBulletinPost(@PathVariable("post-id") @Positive long bulletinPostId, @RequestPart BulletinPostDto.Patch patchDto, @RequestPart(required = false) MultipartFile photoImage) {

//        member service 에서 로그인 멤버아이디 가져오는 메서드 가져오면 될듯!!
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        UserDetails userDetails = (UserDetails)principal;
//        long memberId = principal.getMemberId();

        patchDto.setBulletinPostId(bulletinPostId);

        //해당 amenity 저장되어있는지 여부 확인후 없으면 저장, 아니면 create 코드
        AmenityCreateDto amenityCreateDto = amenityMapper.bulletinPostDtoToAmenityCreateDto(patchDto);
        Amenity amenity = amenityService.findDBAmenity(amenityCreateDto);

        BulletinPost bulletinPost =
                bulletinPostService.updateBulletinPost(bulletinPostMapper.bulletinPostPatchDtoToBulletinPost(patchDto), amenity, photoImage);


        return new ResponseEntity<>(
                new ApiSingleResponse<>(HttpStatus.OK,"게시물이 수정되었습니다.",bulletinPostMapper.bulletinPostToBulletinPostResponseDto(bulletinPost,bulletinPostService, likeService)), HttpStatus.OK);
    }


    @GetMapping("/{post-id}")
    public ResponseEntity getBulletinPost(
            @PathVariable("post-id") @Positive long bulletinPostId) {

        BulletinPost bulletinPost = bulletinPostService.findBulletinPost(bulletinPostId);

        return new ResponseEntity<>(
                new ApiSingleResponse<>(HttpStatus.OK, "게시물 1개 조회", bulletinPostMapper.bulletinPostToBulletinPostResponseDto(bulletinPost,bulletinPostService, likeService))
                , HttpStatus.OK);
    }

    //피드에서 bulletinPosts 리스트 가져오는 거
    @GetMapping("/feed")
    public ResponseEntity getBulletinPosts(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size) {

        Page<BulletinPost> pageBulletinPosts = bulletinPostService.findBulletinPosts(page - 1, size);
        List<BulletinPost> bulletinPosts = pageBulletinPosts.getContent();

        return new ResponseEntity<>(
                new ApiMultiResponse<>(HttpStatus.OK, "게시물 피드", bulletinPostMapper.bulletinPostsToBulletinPostResponseForFeedDtos(bulletinPosts),
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
                new ApiMultiResponse<>(HttpStatus.OK, "해당 멤버의 게시물 조회", bulletinPostMapper.bulletinPostsToBulletinPostResponseDtos(bulletinPosts),
                        pageBulletinPosts),
                HttpStatus.OK);
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity deleteBulletinPost(
            @PathVariable("post-id") @Positive long bulletinPostId) {
        bulletinPostService.deleteBulletinPost(bulletinPostId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{post-id}/likes")
    public ResponseEntity createLike(@PathVariable("post-id") @Positive long postId) {

//        member service 에서 로그인 멤버아이디 가져오는 메서드

        Like like = likeService.createLike(postId);

        return new ResponseEntity<>(
                new ApiSingleResponse<>(HttpStatus.OK,"좋아요가 생성되었습니다.", likeMapper.toLikeResponseDto(postId, bulletinPostService)), HttpStatus.OK);
    }

    @DeleteMapping("/{post-id}/likes")
    public ResponseEntity deleteLike(
            @PathVariable("post-id") @Positive long postId) {

        likeService.deleteLike(postId);

        return new ResponseEntity<>(
                new ApiSingleResponse<>(HttpStatus.OK,"좋아요가 취소되었습니다.", likeMapper.toLikeResponseDto(postId, bulletinPostService)), HttpStatus.OK);
    }

}
