package com.mybuddy.amenity.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
public class AmenityForMyPageResponseDto {

    private final Long amenityId;

    private final String amenityName;

    private final String address;

    private final String photoUrl;

    private final LocalDateTime postCreatedAt;

    @Builder
    public AmenityForMyPageResponseDto(Long amenityId, String amenityName, String address,
                                       String photoUrl, LocalDateTime postCreatedAt) {
        this.amenityId = amenityId;
        this.amenityName = amenityName;
        this.address = address;
        this.photoUrl = photoUrl;
        this.postCreatedAt = postCreatedAt;
    }
}
