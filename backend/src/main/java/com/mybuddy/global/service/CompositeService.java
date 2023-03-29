package com.mybuddy.global.service;

import com.mybuddy.amenity.dto.AmenityCreateDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.mapper.AmenityMapper;
import com.mybuddy.amenity.service.AmenityService;
import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.mapper.BulletinPostMapper;
import com.mybuddy.bulletin_post.service.BulletinPostService;
import com.mybuddy.global.exception.LogicException;
import com.mybuddy.global.exception.LogicExceptionCode;
import com.mybuddy.global.storage.StorageService;
import com.mybuddy.global.utils.ApiMultiResponse;
import com.mybuddy.global.utils.ApiSingleResponse;
import com.mybuddy.like.entity.Like;
import com.mybuddy.like.mapper.LikeMapper;
import com.mybuddy.like.service.LikeService;
import com.mybuddy.member.entity.Member;
import com.mybuddy.member.service.MemberServiceImpl;
import com.mybuddy.search.mapper.SearchMapper;
import com.mybuddy.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

//@Service service여야하나
@Component
@RequiredArgsConstructor
public class CompositeService {

    private final BulletinPostService bulletinPostService;
    private final BulletinPostMapper bulletinPostMapper;
    private final AmenityMapper amenityMapper;
    private final AmenityService amenityService;
    private final LikeService likeService;
    private final LikeMapper likeMapper;
    private final SearchService searchService;
    private final SearchMapper searchMapper;
    private final MemberServiceImpl memberService;
    private final StorageService storageService;

    public ApiSingleResponse createBulletinPost(Long loginUserId, BulletinPostDto.Create createDto, MultipartFile photoImage) {

        Amenity amenity = null;
        if (createDto.getAddress() != null) {
            //해당 amenity 저장되어있는지 여부 확인후 없으면 저장, 아니면 create 코드
            AmenityCreateDto amenityCreateDto = amenityMapper.bulletinPostDtoToAmenityCreateDto(createDto);

            amenity = amenityService.findDBAmenity(amenityCreateDto);
        }


        BulletinPost bulletinPost =
                bulletinPostService.createPost(bulletinPostMapper.bulletinPostCreateDtoToBulletinPost(createDto), loginUserId, amenity, memberService, storageService, photoImage);


        return new ApiSingleResponse<>(HttpStatus.OK, "게시물이 생성되었습니다.", bulletinPostMapper.bulletinPostToBulletinPostResponseDto(bulletinPost, bulletinPostService, likeService, loginUserId));
    }

    public ApiSingleResponse patchBulletinPost(long postId, Long loginUserId, BulletinPostDto.Patch patchDto, MultipartFile photoImage) {

        Amenity amenity = new Amenity(null, null, null, null, null);
        if (patchDto.getAddress() != null) {
            //해당 amenity 저장되어있는지 여부 확인후 없으면 저장, 아니면 create 코드
            AmenityCreateDto amenityCreateDto = amenityMapper.bulletinPostDtoToAmenityCreateDto(patchDto);

            amenity = amenityService.findDBAmenity(amenityCreateDto);
        }


        BulletinPost bulletinPost =
                bulletinPostService.updatePost(bulletinPostMapper.bulletinPostPatchDtoToBulletinPost(patchDto), postId, loginUserId, amenity, memberService, storageService, photoImage);

        return new ApiSingleResponse<>(HttpStatus.OK, "게시물이 수정되었습니다.", bulletinPostMapper.bulletinPostToBulletinPostResponseDto(bulletinPost, bulletinPostService, likeService, loginUserId));
    }

    public ApiSingleResponse getBulletinPost(long postId, Long loginUserId) {

        BulletinPost bulletinPost = bulletinPostService.findPost(postId);

        return new ApiSingleResponse<>(HttpStatus.OK, "게시물 1개를 조회합니다.", bulletinPostMapper.bulletinPostToBulletinPostResponseDto(bulletinPost, bulletinPostService, likeService, loginUserId));
    }

    public ApiMultiResponse getBulletinPostsFeed(Long loginUserId, int page, int size) {

        Page<BulletinPost> pageBulletinPosts = bulletinPostService.findPosts(loginUserId, page - 1, size, memberService);
        List<BulletinPost> bulletinPosts = pageBulletinPosts.getContent();

        return new ApiMultiResponse<>(HttpStatus.OK, "게시물 피드를 조회합니다.", bulletinPostMapper.bulletinPostsToBulletinPostResponseForFeedDtos(bulletinPosts),
                pageBulletinPosts);
    }

    public void deleteBulletinPost(long postId, Long loginUserId) {

        bulletinPostService.deletePost(postId, loginUserId, memberService, storageService);
    }

    //메서드명이 겹치지 않게 하려다보니 애매...
    public ApiSingleResponse createLike(long postId, Long loginUserId) {

        Like like = likeService.createLike(postId, loginUserId);

        return new ApiSingleResponse<>(HttpStatus.OK, "좋아요가 생성되었습니다.", likeMapper.toLikeResponseDto(postId, likeService));
    }

    public ApiSingleResponse deleteLike(long postId, Long loginUserId) {

        likeService.deleteLike(postId, loginUserId);

        return new ApiSingleResponse<>(HttpStatus.OK, "좋아요가 취소되었습니다.", likeMapper.toLikeResponseDto(postId, likeService));
    }

    public ApiMultiResponse searchMembersByName(String type, String name, int page, int size) {

        Page<Member> pageMembers = searchService.findByNameType(type, page - 1, size, name);
        List<Member> members = pageMembers.getContent();

        return new ApiMultiResponse<>(HttpStatus.OK, "해당 타입의 검색 결과를 조회합니다.", searchMapper.membersToSearchResponseDtos(members), pageMembers);

    }

}
