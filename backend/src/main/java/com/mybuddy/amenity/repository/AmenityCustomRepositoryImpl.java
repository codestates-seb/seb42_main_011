package com.mybuddy.amenity.repository;

import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.dto.AmenityWithBulletinPost;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.entity.QAmenity;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.entity.QBulletinPost;
import com.mybuddy.bulletin_post.mapper.BulletinPostMapper;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;

import static com.querydsl.core.types.Projections.bean;

@RequiredArgsConstructor
public class AmenityCustomRepositoryImpl implements AmenityCustomRepository{

    private final JPAQueryFactory queryFactory;
    private final BulletinPostMapper bulletinPostMapper;
    @Override
    public Amenity findByAddressId(Long addressId) {

        QAmenity amenity = new QAmenity("amenity");

        return queryFactory
                .select(amenity)
                .from(amenity)
                .where(amenity.addressId.eq(addressId))
                .fetchOne();
    }

    //특정 장소와 태그된 게시글들 페이지네이션 처리해 반환
    @Override
    public AmenityWithBulletinPost findAmenityWithBulletinPostByAmenityId(Long amenityId, PageRequest pageRequest) {


        QAmenity amenity = QAmenity.amenity;
        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;

        // 일단 작동하는 코드입니다.
        // BulletinPost가 페이징처리되어 지속적으로 요청이 오는데, a를 계속 조회하면 효율성이 떨어짐.
        // Amenity 1개 조회와, AmenityId로 BulletinPostList를 조회하도록 분리가 필요.
        // 나중에 bulletinPost custom repository 생성되면 수정 필요 (2023.03.12 강지은)
        QueryResults<BulletinPost> queryResults = queryFactory
                    .selectFrom(bulletinPost)
                    .where(bulletinPost.amenity.amenityId.eq(amenityId))
                    .offset(pageRequest.getOffset())
                    .limit(pageRequest.getPageSize())
                    .fetchResults();

        Amenity a = queryFactory
                .select(amenity)
                .from(amenity)
                .where(amenity.amenityId.eq(amenityId))
                .fetchOne();

        List<BulletinPost> findList = queryResults.getResults();
        Page<BulletinPost> page = new PageImpl<>(queryResults.getResults(), pageRequest, queryResults.getTotal());

        return AmenityWithBulletinPost.builder()
                .addressId(a.addressId)
                .amenityName(a.amenityName)
                .address(a.address)
                .longitude(a.longitude)
                .latitude(a.latitude)
                .bulletinPosts(bulletinPostMapper.bulletinPostsToBulletinPostResponseForFeedDtos(findList))
                .page(page)
                .build();

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
