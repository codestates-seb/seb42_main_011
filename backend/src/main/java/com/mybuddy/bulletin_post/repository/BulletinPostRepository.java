package com.mybuddy.bulletin_post.repository;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//@Repository 필수인가?
public interface BulletinPostRepository extends JpaRepository<BulletinPost, Long>, BulletinPostCustomRepository {

    Optional<Page<BulletinPost>> findByMemberMemberId(long memberId, Pageable pageable);
}


