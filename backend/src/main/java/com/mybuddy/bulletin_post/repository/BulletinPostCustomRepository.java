package com.mybuddy.bulletin_post.repository;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface BulletinPostCustomRepository {

//    Optional<Page<BulletinPost>> findAllFollowingPostsByMemberId(long memberId, Pageable pageable);
    Page<BulletinPost> findByAmenityId(Long amenityId, PageRequest pageRequest);
}
