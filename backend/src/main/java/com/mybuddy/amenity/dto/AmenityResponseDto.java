package com.mybuddy.amenity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AmenityResponseDto {
    private Long amenityId;
    private Long addressId;
    private String amenityName;
    private String address;
    private Double longitude;
    private Double latitude;

    private Long bulletinPostCount;

    @Builder
    public AmenityResponseDto(Long amenityId, Long addressId, String amenityName, String address, Double longitude, Double latitude, Long bulletinPostCount) {
        this.amenityId = amenityId;
        this.addressId = addressId;
        this.amenityName = amenityName;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.bulletinPostCount = bulletinPostCount;
    }
}
