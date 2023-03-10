package com.mybuddy.amenity.mapper;

import com.mybuddy.amenity.dto.AmenityCreateDto;
import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "Spring")
public interface AmenityMapper {


    Amenity AmenityCreateDtoToAmenity(AmenityCreateDto amenityCreateDto);
    AmenityResponseDto AmenityToAmenityResponseDto(Amenity amenity);

    List<AmenityResponseDto> AmenityListToAmenityResponseDto(List<Amenity> amenityList);

    default AmenityCreateDto BullletinPostCreateDtoToAmenityCreateDto(BulletinPostDto.Create bulletinPostCreateDto) {
        if ( bulletinPostCreateDto == null ) {
            return null;
        }

        AmenityCreateDto amenityCreateDto = AmenityCreateDto
                .builder()
                .addressId(bulletinPostCreateDto.getAddressId())
                .amenityName(bulletinPostCreateDto.getAmenityName())
                .address(bulletinPostCreateDto.getAddress())
                .longitude(bulletinPostCreateDto.getLongitude())
                .latitude(bulletinPostCreateDto.getLongitude())
                .build();

        return amenityCreateDto;
    }
}
