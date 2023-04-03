package com.mybuddy.amenity.repository;

import com.mybuddy.amenity.entity.Amenity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AmenityRepository extends JpaRepository<Amenity, Long>, AmenityCustomRepository {
}
