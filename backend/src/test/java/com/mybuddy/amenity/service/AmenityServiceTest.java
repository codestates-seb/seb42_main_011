package com.mybuddy.amenity.service;

import com.mybuddy.amenity.dto.AmenityCreateDto;
import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.mapper.AmenityMapper;
import com.mybuddy.amenity.repository.AmenityRepository;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.repository.BulletinPostRepository;
import com.mybuddy.global.mockdata.MockTestData;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AmenityServiceTest {

    @Mock
    private AmenityRepository amenityRepository;

    @Mock
    private BulletinPostRepository bulletinPostRepository;

    @Mock
    private AmenityMapper amenityMapper;

    @Spy
    @InjectMocks
    private AmenityService amenityService;

    @DisplayName("장소가 존재하는지 체크 & 존재하지 않아서 장소 등록 후 반환 테스트")
    @Test
    public void findDBAmenityReturnsCreateAmenityTest() {


        // given
        AmenityCreateDto amenityCreateDto = MockTestData.MockAmenity.getAmenityCreateDto();

        when(amenityRepository.findByAddressId(any(Long.class))).thenReturn(null);

        Amenity createAmenity = MockTestData.MockAmenity.getAmenity();
        given(amenityMapper.amenityCreateDtoToAmenity(any(AmenityCreateDto.class))).willReturn(createAmenity);
        given(amenityRepository.save(any(Amenity.class))).willReturn(createAmenity);

        // when
        Amenity obtainedAmenity = amenityService.findDBAmenity(amenityCreateDto);

        //then
        verify(amenityRepository).findByAddressId(createAmenity.getAddressId());
        verify(amenityMapper).amenityCreateDtoToAmenity(amenityCreateDto);
        verify(amenityRepository).save(createAmenity);
        assert createAmenity == obtainedAmenity;


    }

    @DisplayName("장소가 존재하는지 체크 & 존재해서 장소 반환 테스트")
    @Test
    public void findDBAmenityReturnsObtainedAmenityTest() {

        // given
        AmenityCreateDto amenityCreateDto = MockTestData.MockAmenity.getAmenityCreateDto();
        Amenity existAmenity = MockTestData.MockAmenity.getAmenity();

        when(amenityRepository.findByAddressId(any(Long.class))).thenReturn(existAmenity);

        // when
        Amenity obtainedAmenity = amenityService.findDBAmenity(amenityCreateDto);

        //then
        verify(amenityRepository).findByAddressId(existAmenity.getAddressId());
        verify(amenityMapper, never()).amenityCreateDtoToAmenity(any(AmenityCreateDto.class));
        verify(amenityRepository, never()).save(any(Amenity.class));
        assert existAmenity == obtainedAmenity;

    }

    @DisplayName("장소 생성 테스트")
    @Test
    public void createAmenityTest() {

        // given
        AmenityCreateDto amenityCreateDto = MockTestData.MockAmenity.getAmenityCreateDto();
        Amenity amenity = MockTestData.MockAmenity.getAmenity();

        given(amenityMapper.amenityCreateDtoToAmenity(any(AmenityCreateDto.class))).willReturn(amenity);
        when(amenityRepository.save(any(Amenity.class))).thenReturn(amenity);

        // when
        Amenity createAmenity = amenityService.createAmenity(amenityCreateDto);

        //then
        verify(amenityMapper).amenityCreateDtoToAmenity(any(AmenityCreateDto.class));
        verify(amenityRepository).save(any(Amenity.class));
        assert amenity == createAmenity;

    }

    @DisplayName("특정 장소가 태그된 게시물 리스트 찾기 테스트")
    @Test
    public void findTaggedBulletinPostListTest() {

        //given
        Long amenityId = 1L;
        int page = 0;
        int size = 10;

        List<BulletinPost> list = MockTestData.MockAmenity.getListBulletinPost();
        Page<BulletinPost> bulletinPostPage = new PageImpl<>(list);

        given(bulletinPostRepository.findByAmenityId(anyLong(),any(PageRequest.class))).willReturn(bulletinPostPage);

        //when
        Page<BulletinPost> resultPage = amenityService.findTaggedBulletinPostList(amenityId,page,size);

        //then
        verify(bulletinPostRepository).findByAmenityId(eq(amenityId), eq(PageRequest.of(page, size, Sort.by("bulletinPostId").descending())));

    }

    @DisplayName("장소 정보 얻기 테스트")
    @Test
    public void getAmenityInfoTest() {

        //given
        Long amenityId = 1L;
        Amenity foundAmenity = MockTestData.MockAmenity.getAmenity();
        Optional<Amenity> optionalAmenity = Optional.of(foundAmenity);

        given(amenityRepository.findById(anyLong())).willReturn(optionalAmenity);

        //when
        Amenity amenity = amenityService.getAmenityInfo(amenityId);

        //then
        assert amenity == foundAmenity;
        verify(amenityRepository).findById(amenityId);

    }
    @DisplayName("장소 정보 없을 때 예외처리 테스트")
    @Test
    public void getAmenityInfoButNullExceptionTest() {

        //given
        Long amenityId = 1L;
        Optional<Amenity> optionalAmenity = Optional.empty();
        when(amenityRepository.findById(amenityId)).thenReturn(optionalAmenity);

        //when, then
        assertThrows(RuntimeException.class, () -> amenityService.getAmenityInfo(amenityId));
    }

    @DisplayName("지역 필터링을 이용한 추천장소 찾기 테스트")
    @Test
    public void getRecommendAmenitiesByStateRegionTest() {

        //given
        String state = "서울";
        String region = "광진구";
        List<AmenityResponseDto> list = MockTestData.MockAmenity.getRecommentAmenityList();

        given(amenityRepository.findByStateRegion(anyString(),anyString())).willReturn(list);

        //when
        List<AmenityResponseDto> resultList = amenityService.getRecommendAmenitiesByStateRegion(state,region);

        //then
        verify(amenityRepository).findByStateRegion(state,region);
        assert list == resultList;
    }
}
