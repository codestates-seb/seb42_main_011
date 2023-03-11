package com.mybuddy.amenity.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AmenityResponseDto {
    private Long amenityId;
    private Long addressId;
    private String amenityName;
    private String address;
    private Double longitude;
    private Double latitude;

    private Long bulletinPostCount;
}
