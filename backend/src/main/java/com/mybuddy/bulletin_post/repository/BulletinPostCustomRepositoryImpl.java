package com.mybuddy.bulletin_post.repository;

import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.entity.QAmenity;
import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.entity.QBulletinPost;
import com.mybuddy.comment.entity.QComment;
import com.mybuddy.follow.entity.Follow;
import com.mybuddy.member.entity.QMember;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.querydsl.core.types.Projections.bean;

@RequiredArgsConstructor
public class BulletinPostCustomRepositoryImpl implements BulletinPostCustomRepository {

    private final JPAQueryFactory queryFactory;

    //follow 구현 후 수정
    @Override
    public Page<BulletinPost> findAllFollowingPostsByMemberId(long memberId, PageRequest pageRequest) {

        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;
        QMember member = QMember.member;

        List<Follow> followees = queryFactory
                .select(member.meAsFolloweeList)
                .from(member)
                .where(member.memberId.eq(memberId))
                .fetchOne();

        List<BulletinPost> posts= new ArrayList<>();
        if (followees == null) {
            return new PageImpl<>(posts, pageRequest, posts.size());
        }

        followees.stream()
                .map(followee -> {
                    List<BulletinPost> tempList =
                            queryFactory
                                    .selectFrom(bulletinPost)
                                    .where(bulletinPost.member.memberId.eq(followee.getFollowee().getMemberId()))
                                    .fetch();
                    return posts.addAll(tempList);
                });

        //list to pagenation 수동
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), posts.size());

        return new PageImpl<>(posts.subList(start, end), pageRequest, posts.size());
    }

    @Override
    public PageImpl<BulletinPost> findByAmenityId(Long amenityId, PageRequest pageRequest) {

        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;


        //해당 장소 id를 파라미터로 받는 findFirstPost()메서드가 있다고 가정하고 해당 사진의 URL을 반환하는걸 작성
        QueryResults<BulletinPost> queryResults = queryFactory
                .selectFrom(bulletinPost)
                .where(bulletinPost.amenity.amenityId.eq(amenityId))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .orderBy(bulletinPost.bulletinPostId.desc())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageRequest, queryResults.getTotal());
    }

// 사용을 안해서
//    @Override
//    public PageImpl<BulletinPost> findByMemberId(Long memberId, PageRequest pageRequest) {
//
//        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;
//
//        QueryResults<BulletinPost> queryResults = queryFactory
//                .select(bulletinPost)
//                .from(bulletinPost)
//                .leftJoin(bulletinPost.member, )
//                .where(bulletinPost.member.memberId.eq(memberId))
//                .offset(pageRequest.getOffset())
//                .limit(pageRequest.getPageSize())
//                .fetchResults();
//
//        return new PageImpl<>(queryResults.getResults(), pageRequest, queryResults.getTotal());
//    }

    @Override
    public long findNumberOfCommentsByPostId(long postId) {

        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;

        return queryFactory
                .select(bulletinPost.comments)
                .from(bulletinPost)
                .where(bulletinPost.bulletinPostId.eq(postId))
                .fetchCount();
    }
}
