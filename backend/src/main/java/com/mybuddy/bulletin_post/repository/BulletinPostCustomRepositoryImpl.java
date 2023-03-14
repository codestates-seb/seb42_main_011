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

    //follow 구현 후 수정
//    @Override
//    public Page<BulletinPost> findAllFollowingPostsByMemberId(long memberId, PageRequest pageRequest) {
//
//        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;
//
//
//        QueryResults<BulletinPost> queryResults = queryFactory
//                .selectFrom(bulletinPost)
//        //이게 following 필드가 리스트일텐데..쿼리문 찾아보기
////                .where(bulletinPost.member.follower(memberId)
//                //일단 생각안나.. 나중에.
//                .offset(pageRequest.getOffset())
//                .limit(pageRequest.getPageSize())
//                .fetchResults();
//
//        return new PageImpl<>(queryResults.getResults(), pageRequest, queryResults.getTotal());
//    }

    @Override
    public PageImpl<BulletinPost> findByAmenityId(Long amenityId, PageRequest pageRequest) {

        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;


        //해당 장소 id를 파라미터로 받는 findFirstPost()메서드가 있다고 가정하고 해당 사진의 URL을 반환하는걸 작성
        QueryResults<BulletinPost> queryResults = queryFactory
                .selectFrom(bulletinPost)
                .where(bulletinPost.amenity.amenityId.eq(amenityId))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageRequest, queryResults.getTotal());
    }
}