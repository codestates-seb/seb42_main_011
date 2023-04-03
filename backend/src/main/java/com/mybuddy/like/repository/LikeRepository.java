package com.mybuddy.like.repository;

import com.mybuddy.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long>, LikeCustomRepository {

}
