package com.mybuddy.amenity.service;

import com.mybuddy.amenity.dto.AmenityCreateDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.mapper.AmenityMapper;
import com.mybuddy.amenity.repository.AmenityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AmenityService {

    private final AmenityMapper amenityMapper;
    private final AmenityRepository amenityRepository;


    /**
     * Return the {@code Amenity} in database
     * @param amenityCreateDto information of amenity (pre-generated externally)
     * @return Amenity
     * if. amenity exists in the database already, returns it.
     * else. create a new one and return
     */
    public Amenity findDBAmenity(AmenityCreateDto amenityCreateDto ) {

        //amenity addressid로 찾고, 존재하면 넘기기
        Amenity findAmenity = amenityRepository.findByAddressId(amenityCreateDto.getAddressId());

        if (findAmenity == null) //안존재하면 createAmenity
            return createAmenity(amenityCreateDto);
        else                        //존재하므로 바로 외부로 넘겨줌
            return findAmenity;
    }

    @Transactional
    public Amenity createAmenity(AmenityCreateDto amenityCreateDto) {
        Amenity amenity = amenityMapper.AmenityCreateDtoToAmenity(amenityCreateDto);
        return amenityRepository.save(amenity);
    }

    @Transactional
    public void getAmenityWithBulletinPost(Long amenityId) {

        //해당 amenity id 가 태그된 bulletin post들이 페이지 처리되어 반환..
        //bulletinPostRepository.findByAmenityId(amenityId);
    }

    @Transactional
    public List<Amenity> getRecommendAmenities(String state, String region){
        List<Amenity> recommendAmenities = amenityRepository.findByStateRegion(state,region);
        return recommendAmenities;
    }
}
