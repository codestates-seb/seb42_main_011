package com.mybuddy.amenity.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AmenityMyPageResponse {

    private Long amenityId;
    private String photoUrl;
    private String amenityName;
    private String address;

    @Builder
    public AmenityMyPageResponse(Long amenityId, String photoUrl, String amenityName, String address) {
        this.amenityId = amenityId;
        this.photoUrl = photoUrl;
        this.amenityName = amenityName;
        this.address = address;
    }
}
