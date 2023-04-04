package com.mybuddy.bulletin_post.repository;

import com.mybuddy.amenity.dto.AmenityResponseDto;
import com.mybuddy.amenity.entity.Amenity;
import com.mybuddy.amenity.entity.QAmenity;
import com.mybuddy.bulletin_post.dto.BulletinPostDto;
import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.bulletin_post.entity.QBulletinPost;
import com.mybuddy.comment.entity.QComment;
import com.mybuddy.follow.entity.Follow;
import com.mybuddy.member.entity.Member;
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

    public Page<BulletinPost> findAllFollowingPostsByMemberId(Long loginUserId, List<Follow> meAsFollowerList, PageRequest pageRequest) {
        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;
        List<BulletinPost> posts = new ArrayList<>();

        if (meAsFollowerList.size() == 0) {
            return new PageImpl<>(posts, pageRequest, posts.size());
        }

        List<Long> followees = meAsFollowerList.stream()
                .map(followee -> followee.getFollowee().getMemberId())
                .collect(Collectors.toList());
        followees.add(loginUserId);

        //날짜 기준 내림차순 정렬
        QueryResults<BulletinPost> queryResults = queryFactory
                .selectFrom(bulletinPost)
                .where(bulletinPost.member.memberId.in(followees))
                .offset(pageRequest.getOffset())
                .limit(pageRequest.getPageSize())
                .orderBy(bulletinPost.createdAt.desc())
                .fetchResults();

        return new PageImpl<>(queryResults.getResults(), pageRequest, queryResults.getTotal());
    }

    //follow 구현 후 수정
    /*@Override
    public Page<BulletinPost> findAllFollowingPostsByMemberId(List<Follow> meAsFollowerList, PageRequest pageRequest) {

        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;

        List<BulletinPost> posts = new ArrayList<>();
        //follower가 없으면 비로그인 유저 피드와 같은 결과
        if (meAsFollowerList.size() == 0) {
            return new PageImpl<>(posts, pageRequest, posts.size());
        }

        for ( Follow follow : meAsFollowerList) {
            List<BulletinPost> tempList =
                    queryFactory
                            .selectFrom(bulletinPost)
                            .where(bulletinPost.member.memberId.eq(follow.getFollowee().getMemberId()))
                            .fetch();
            posts.addAll(tempList);
        }
//        meAsFollowerList.stream()
//                .map(followee -> {
//                    List<BulletinPost> tempList =
//                            queryFactory
//                                    .selectFrom(bulletinPost)
//                                    .where(bulletinPost.member.memberId.eq(followee.getFollowee().getMemberId()))
//                                    .fetch();
//                    posts.addAll(tempList);
//                    return posts;
//                });

        //list to pagenation 수동
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), posts.size());

        return new PageImpl<>(posts.subList(start, end), pageRequest, posts.size());
    }*/

    @Override
    public PageImpl<BulletinPost> findByAmenityId(Long amenityId, PageRequest pageRequest) {

        QBulletinPost bulletinPost = QBulletinPost.bulletinPost;


        //해당 장소 id를 파라미터로 받는 findFirstPost()메서드가 있다고 가정하고 해당 사진의 URL을 반환하는걸 작성
        QueryResults<BulletinPost> queryResults = queryFactory
                .selectFrom(bulletinPost)
                .where(bulletinPost.amenity.amenityId.eq(amenityId)
                        .and(bulletinPost.member.memberStatus.ne(Member.MemberStatus.DELETED)))
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
