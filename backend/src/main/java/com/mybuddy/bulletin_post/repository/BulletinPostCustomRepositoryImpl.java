package com.mybuddy.bulletin_post.repository;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.entity.QBulletinPost;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

@RequiredArgsConstructor
public class BulletinPostCustomRepositoryImpl implements BulletinPostCustomRepository {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<BulletinPost> findByAmenityId(Long amenityId, PageRequest pageRequest) {

        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;

        QueryResults<BulletinPost> queryResults = queryFactory
                .selectFrom(bulletinPost)
                .where(bulletinPost.amenity.amenityId.eq(amenityId))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageRequest, queryResults.getTotal());
    }
}
