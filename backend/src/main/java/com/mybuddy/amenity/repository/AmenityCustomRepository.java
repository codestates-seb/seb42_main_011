package com.mybuddy.amenity.repository;

import com.mybuddy.amenity.entity.Amenity;

import java.util.List;

public interface AmenityCustomRepository {

    Amenity findByAddressId(Long addressId);

    List<Amenity> findByBulletinPostId(Long bulletinPostId);

    List<Amenity> findByStateRegion(String state, String region);
}
