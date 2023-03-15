package com.mybuddy.amenity.service;

import com.mybuddy.amenity.dto.AmenityCreateDto;
import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.mapper.AmenityMapper;
import com.mybuddy.amenity.repository.AmenityRepository;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.repository.BulletinPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AmenityService {

    private final AmenityMapper amenityMapper;
    private final AmenityRepository amenityRepository;
    private final BulletinPostRepository bulletinPostRepository;

    /**
     * Return the {@code Amenity} in database
     * @param amenityCreateDto information of amenity (pre-generated externally)
     * @return Amenity
     * if. amenity exists in the database already, returns it.
     * else. create a new one and return
     */
    public Amenity findDBAmenity(AmenityCreateDto amenityCreateDto) {

        //amenity addressid로 찾고, 존재하면 넘기기
        Amenity obtainedAmenity = amenityRepository.findByAddressId(amenityCreateDto.getAddressId());

        if (obtainedAmenity == null) //안존재하면 createAmenity
            return createAmenity(amenityCreateDto);
        else                        //존재하므로 바로 외부로 넘겨줌
            return obtainedAmenity;
    }

    @Transactional
    public Amenity createAmenity(AmenityCreateDto amenityCreateDto) {
        Amenity amenity = amenityMapper.amenityCreateDtoToAmenity(amenityCreateDto);
        return amenityRepository.save(amenity);
    }

    @Transactional
    public Page<BulletinPost> findTaggedBulletinPostList(Long amenityId, int page, int size) {

        return bulletinPostRepository.findByAmenityId(amenityId,
                PageRequest.of(page, size, Sort.by("bulletinPostId").descending()));
    }

    @Transactional
    public Amenity getAmenityInfo(Long amenityId) {
        return amenityRepository.findById(amenityId).orElseThrow(()-> new RuntimeException("amenity data가 없다."));
    }

    @Transactional
    public List<AmenityResponseDto> getRecommendAmenities(String state, String region){

        List<AmenityResponseDto> recommendAmenities = amenityRepository.findByStateRegion(state,region);
        return recommendAmenities;
    }
}
