package com.mybuddy.bulletin_post.repository;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import com.mybuddy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BulletinPostCustomRepository {

//    Optional<Page<BulletinPost>> findAllFollowingPostsByMemberId(long memberId, Pageable pageable);
}
