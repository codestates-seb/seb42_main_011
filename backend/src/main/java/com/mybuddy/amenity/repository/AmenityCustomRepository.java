package com.mybuddy.amenity.repository;

import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface AmenityCustomRepository {

    Amenity findByAddressId(Long addressId);

    List<AmenityResponseDto> findByStateRegion(String state, String region);
}
