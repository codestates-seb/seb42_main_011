package com.mybuddy.bulletin_post.repository;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.follow.entity.Follow;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface BulletinPostCustomRepository {

    Page<BulletinPost> findAllFollowingPostsByMemberId(Long loginUserId, List<Follow> meAsFollowerList, PageRequest pageRequest);

    Page<BulletinPost> findByAmenityId(Long amenityId, PageRequest pageRequest);

//    사용을 안해서
//    PageImpl<BulletinPost> findByMemberId(Long memberId, PageRequest pageRequest);
    long findNumberOfCommentsByPostId(long postId);
}
