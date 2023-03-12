package com.mybuddy.amenity.repository;

import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.dto.AmenityWithBulletinPost;
import com.mybuddy.amenity.entity.Amenity;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface AmenityCustomRepository {

    Amenity findByAddressId(Long addressId);

    AmenityWithBulletinPost findAmenityWithBulletinPostByAmenityId(Long amenityId, PageRequest pageRequest);

    List<AmenityResponseDto> findByStateRegion(String state, String region);
}
