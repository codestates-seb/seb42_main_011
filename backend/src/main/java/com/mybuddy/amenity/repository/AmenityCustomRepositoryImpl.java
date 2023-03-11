package com.mybuddy.amenity.repository;

import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.entity.QAmenity;
import com.mybuddy.bulletin_post.entity.QBulletinPost;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static com.querydsl.core.types.Projections.bean;

@RequiredArgsConstructor
public class AmenityCustomRepositoryImpl implements AmenityCustomRepository{

    private final JPAQueryFactory queryFactory;

    @Override
    public Amenity findByAddressId(Long addressId) {

        QAmenity amenity = new QAmenity("amenity");

        return queryFactory
                .select(amenity)
                .from(amenity)
                .where(amenity.addressId.eq(addressId))
                .fetchOne();
    }

    //해당 게시글에 태그된 장소를 가져옴
    @Override
    public List<Amenity> findByBulletinPostId(Long bulletinPostId) {

        List<Amenity> amenities = new ArrayList<>();
        QAmenity amenity = new QAmenity("amenity");
        /*QBulletinPost
        return queryFactory
                .select(amenity)
                .from(amenity)
                .where(amenity.addressId.eq(addressId))
                .fetchOne();
        */

        return amenities;
    }

    //해당 게시글에 태그된 장소를 가져옴
    @Override
    public List<AmenityResponseDto> findByStateRegion(String state, String region) {

        String keyword = state + " " + region;

        QAmenity amenity = QAmenity.amenity;
        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;

        //BulletinPost와 join하여 데이터가 많은 수로 카운트 해 상위 몇개만 전달할지, 전체적으로 전달할지 고민
        //연관관계 미적용이라 쿼리 이후에 반영. 현재는 키워드 포함한 모든 데이터를 반환함(2023.03.10 강지은)
        List<AmenityResponseDto> amenities  = queryFactory
                .select(bean(AmenityResponseDto.class,
                        amenity.amenityId.as("amenityId"),
                        amenity.addressId.as("addressId"),
                        amenity.address.as("address"),
                        amenity.amenityName.as("amenityName"),
                        amenity.longitude.as("longitude"),
                        amenity.latitude.as("latitude"),
                        bulletinPost.amenity.amenityId.as("amenityId"),
                        bulletinPost.bulletinPostId.count().as("bulletinPostCount")))
                .from(amenity)
                .join(amenity.bulletinPostList, bulletinPost)
                .where(amenity.address.like("%" + keyword + "%"))
                .groupBy(bulletinPost.amenity.amenityId)
                .orderBy(bulletinPost.bulletinPostId.count().desc())
                .fetch();

        return amenities;
    }
}
