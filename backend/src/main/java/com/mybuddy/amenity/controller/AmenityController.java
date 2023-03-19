package com.mybuddy.amenity.controller;


import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.mapper.AmenityMapper;
import com.mybuddy.amenity.service.AmenityService;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.mapper.BulletinPostMapper;
import com.mybuddy.global.utils.ApiMultiResponse;
import com.mybuddy.global.utils.ApiSingleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/amenities")
@RestController
@RequiredArgsConstructor
public class AmenityController {

    private static final String DEFAULT_URL = "/api/v1/amenities";
    private final AmenityService amenityService;
    private final AmenityMapper amenityMapper;

    private final BulletinPostMapper bulletinPostMapper;


    @GetMapping("{amenity-id}")
    public ResponseEntity<ApiSingleResponse> getAmenity(@PathVariable("amenity-id") Long amenityId) {

        Amenity amenity = amenityService.getAmenityInfo(amenityId);
        AmenityResponseDto amenityResponseDto = amenityMapper.amenityToAmenityResponseDto(amenity);
        ApiSingleResponse response = new ApiSingleResponse<>(HttpStatus.OK,"장소 정보 반환", amenityResponseDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("{amenity-id}/bulletin-posts")
    public ResponseEntity<ApiMultiResponse> findTaggedBulletinPostByAmenityId(@PathVariable("amenity-id") Long amenityId,
                                                                                    @RequestParam(name = "page") int page,
                                                                                    @RequestParam(name = "size") int size) {

        Page<BulletinPost> pageResult = amenityService.findTaggedBulletinPostList(amenityId, page - 1, size);
        List<BulletinPost> bulletinPosts = pageResult.getContent();
        ApiMultiResponse response = new ApiMultiResponse<>(HttpStatus.OK,"장소가 태그된 게시물들 반환",
                bulletinPostMapper.bulletinPostsToBulletinPostResponseForFeedDtos(bulletinPosts), pageResult);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiSingleResponse> getRecommendAmenities(@RequestParam(name = "state") String state,
                                                                   @RequestParam(name = "region") String region) {

        List<AmenityResponseDto> amenityList = amenityService.getRecommendAmenitiesByStateRegion(state,region);
        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.OK,"해당 지역의 추천 장소 리스트", amenityList);

        return ResponseEntity.ok(response);
    }

}
