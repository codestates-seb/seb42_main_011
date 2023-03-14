package com.mybuddy.bulletin_post.repository;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BulletinPostCustomRepository {

//    Page<BulletinPost> findAllFollowingPostsByMemberId(long memberId, PageRequest pageRequest);

    Page<BulletinPost> findByAmenityId(Long amenityId, PageRequest pageRequest);

}
