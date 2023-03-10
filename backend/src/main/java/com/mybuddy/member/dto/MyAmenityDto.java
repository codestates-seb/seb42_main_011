package com.mybuddy.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MyAmenityDto {

    private Long amenityId;

    private String amenityName;

    private String address;

    private String photoUrl;

    @Builder
    public MyAmenityDto(Long amenityId, String amenityName, String address, String photoUrl) {
        this.amenityId = amenityId;
        this.amenityName = amenityName;
        this.address = address;
        this.photoUrl = photoUrl;
    }
}
