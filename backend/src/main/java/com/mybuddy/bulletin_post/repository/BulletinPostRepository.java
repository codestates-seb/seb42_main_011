package com.mybuddy.bulletin_post.repository;

import com.mybuddy.bulletin_post.entity.BulletinPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BulletinPostRepository extends JpaRepository<BulletinPost, Long> {

    //해당 장소 id를 파라미터로 받는 findFirstPost()메서드가 있다고 가정하고 해당 사진의 URL을 반환하는걸 작성
}
