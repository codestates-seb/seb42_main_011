package com.mybuddy.bulletin_post.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class BulletinPostCustomRepositoryImpl implements BulletinPostCustomRepository {

    private final JPAQueryFactory queryFactory;

//    어메니티 서비스 클래스에 있던 getAmenityWithBulletinPost 이 메서드가 BulletinPostCustomRepositoryImpl의  findByAmenityId 메서드로 작성


}
