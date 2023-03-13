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

    //해당 장소 id를 파라미터로 받는 findFirstPost()메서드가 있다고 가정하고 해당 사진의 URL을 반환하는걸 작성
}
