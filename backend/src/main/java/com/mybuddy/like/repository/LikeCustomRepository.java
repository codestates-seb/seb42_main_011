package com.mybuddy.like.repository;

import com.mybuddy.like.entity.Like;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.Optional;

public interface LikeCustomRepository {

    Optional<Like> findByPostAndMemberId(long postId, Long memberId);

}
