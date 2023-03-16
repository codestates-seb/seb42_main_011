package com.mybuddy.amenity.repository;

import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;

import java.util.List;

public interface AmenityCustomRepository {

    Amenity findByAddressId(Long addressId);

    List<AmenityResponseDto> findByStateRegion(String state, String region);

    List<Amenity> findByMemberId(Long memberId);
}
