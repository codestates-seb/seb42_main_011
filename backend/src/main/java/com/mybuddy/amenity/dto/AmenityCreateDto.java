package com.mybuddy.amenity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class AmenityCreateDto {

    private Long addressId;
    private String amenityName;
    private String address;
    private Double longitude;
    private Double latitude;

    @Builder
    public AmenityCreateDto(Long addressId, String amenityName, String address, Double longitude, Double latitude) {
        this.addressId = addressId;
        this.amenityName = amenityName;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}
