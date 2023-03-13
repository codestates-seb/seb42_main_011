package com.mybuddy.amenity.mapper;

import com.mybuddy.amenity.dto.AmenityCreateDto;
import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "Spring")
public interface AmenityMapper {


    Amenity amenityCreateDtoToAmenity(AmenityCreateDto amenityCreateDto);
    AmenityResponseDto amenityToAmenityResponseDto(Amenity amenity);

    List<AmenityResponseDto> AmenityListToAmenityResponseDto(List<Amenity> amenityList);

    default <T extends BulletinPostDto.InnerParent> AmenityCreateDto bulletinPostDtoToAmenityCreateDto(T bulletinPostDto) {
        if ( bulletinPostDto == null ) {
            return null;
        }

        AmenityCreateDto amenityCreateDto = AmenityCreateDto
                .builder()
                .addressId(bulletinPostDto.getAddressId())
                .amenityName(bulletinPostDto.getAmenityName())
                .address(bulletinPostDto.getAddress())
                .longitude(bulletinPostDto.getLongitude())
                .latitude(bulletinPostDto.getLongitude())
                .build();

        return amenityCreateDto;
    }
}
