package com.mybuddy.follow.repository;

import com.mybuddy.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long>, FollowCustomRepository {

}
