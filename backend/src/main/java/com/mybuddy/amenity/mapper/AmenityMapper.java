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

    default AmenityCreateDto bulletinPostCreateDtoToAmenityCreateDto(BulletinPostDto.Create bulletinPostCreateDto) {
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
    default AmenityCreateDto BullletinPostPatchDtoToAmenityCreateDto(BulletinPostDto.Patch bulletinPostPatchDto) {
        if ( bulletinPostPatchDto == null ) {
            return null;
        }

        AmenityCreateDto amenityCreateDto = AmenityCreateDto
                .builder()
                .addressId(bulletinPostPatchDto.getAddressId())
                .amenityName(bulletinPostPatchDto.getAmenityName())
                .address(bulletinPostPatchDto.getAddress())
                .longitude(bulletinPostPatchDto.getLongitude())
                .latitude(bulletinPostPatchDto.getLongitude())
                .build();

        return amenityCreateDto;
    }
}
