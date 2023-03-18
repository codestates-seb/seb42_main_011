package com.mybuddy.bulletin_post.repository;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface BulletinPostCustomRepository {

    Page<BulletinPost> findAllFollowingPostsByMemberId(long memberId, PageRequest pageRequest);

    Page<BulletinPost> findByAmenityId(Long amenityId, PageRequest pageRequest);

//    PageImpl<BulletinPost> findByMemberId(Long memberId, PageRequest pageRequest);

    long findNumberOfCommentsByPostId(long postId);
}
