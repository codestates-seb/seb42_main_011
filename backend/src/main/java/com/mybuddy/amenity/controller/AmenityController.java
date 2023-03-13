package com.mybuddy.amenity.controller;

import com.mybuddy.amenity.dto.AmenityCreateDto;
import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.dto.AmenityWithBulletinPost;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.mapper.AmenityMapper;
import com.mybuddy.amenity.service.AmenityService;
import com.mybuddy.global.utils.ApiSingleResponse;
import lombok.RequiredArgsConstructor;
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


    //테스트용으로 제작한 핸들러 메서드이고 정상 작동하는 것을 확인 후에 삭제할 예정입니다. (2023.03.09 강지은)
    @PostMapping
    public ResponseEntity<Amenity> createAmenity(@RequestBody AmenityCreateDto amenityCreateDto) {

        //BulletinPost생성시 body로 전달받은 Amenity 정보를
        //AmenityCreateDto에 담고, 아래와 같이 호출하면 정상 작동합니다.
        //데이터베이스에 해당 장소가 존재할 경우 그 장소의 엔티티를 반환,
        //데이터베이스에 해당 장소가 존재하지 않으면 새로 생성한 엔티티를 반환합니다.

        Amenity amenity = amenityService.findDBAmenity(amenityCreateDto);

        return ResponseEntity.ok(amenity);
    }


    @GetMapping("{amenity-id}")
    public ResponseEntity<ApiSingleResponse> findAmenityWithBulletinPostByAmenityId(@PathVariable("amenity-id") Long amenityId,
                                                                        @RequestParam(name = "page") int page,
                                                                        @RequestParam(name = "size") int size) {

        AmenityWithBulletinPost amenityWithBulletinPost = amenityService.getAmenityWithBulletinPost(amenityId, page - 1, size);

        ApiSingleResponse response = new ApiSingleResponse<>(HttpStatus.OK,"장소와 그 장소가 태그된 게시물들 반환", amenityWithBulletinPost);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiSingleResponse> getRecommendAmenities(@RequestParam(name = "state") String state,
                                                                   @RequestParam(name = "region") String region) {

        List<AmenityResponseDto> amenityList = amenityService.getRecommendAmenities(state,region);
        ApiSingleResponse response = new ApiSingleResponse(HttpStatus.OK,"지역에서 추천하는 장소 리스트입니다.", amenityList);

        return ResponseEntity.ok(response);
    }

}
