package com.tfg.TFG.model.entities;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewDao extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r WHERE r.review_lodgeEmail = :lodgeEmail AND r.is_blocked = false")
    List<Review> findByLodgeEmail(@Param("lodgeEmail") String lodgeEmail);
}
