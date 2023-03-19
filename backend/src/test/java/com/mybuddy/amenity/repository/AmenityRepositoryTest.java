package com.mybuddy.amenity.repository;

import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.repository.BulletinPostRepository;
import com.mybuddy.global.config.TestConfig;
import com.mybuddy.global.mockdata.MockTestData;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Import(TestConfig.class)
public class AmenityRepositoryTest {

    @Autowired
    AmenityRepository amenityRepository;

    @Autowired
    BulletinPostRepository bulletinPostRepository;

    @Autowired
    EntityManager entityManager;

    private Amenity amenity = MockTestData.MockAmenity.getAmenity();

    @BeforeEach
    public void init() {
        amenityRepository.save(amenity);
    }

    @DisplayName("address id로 찾기 테스트")
    @Test
    public void findByAddressIdTest() {

        //given == init
        //when
        Amenity foundAmenity = amenityRepository.findByAddressId(amenity.getAddressId());

        //then
        assertEquals(amenity.getAddressId(), foundAmenity.getAddressId());
        assertEquals(amenity.getAmenityId(), foundAmenity.getAmenityId());
        assertEquals(amenity.getAddress(), foundAmenity.getAddress());
        assertEquals(amenity.getAmenityName(), foundAmenity.getAmenityName());
        assertEquals(amenity.getLatitude(), foundAmenity.getLatitude());
        assertEquals(amenity.getLongitude(), foundAmenity.getLongitude());
    }
}