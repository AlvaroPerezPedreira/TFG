package com.tfg.TFG.model.entities;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LodgeDao extends JpaRepository<Lodge, Long> {

    @Query("SELECT l FROM Lodge l WHERE l.is_banned = false")
    Page<Lodge> findAllAndIsBannedFalse(Pageable pageable);

    @Query("SELECT l FROM Lodge l WHERE l.country = :country AND l.is_banned = false")
    Page<Lodge> findByCountryAndIsBannedFalse(@Param("country") String country, Pageable pageable);

    @Query("SELECT l FROM Lodge l WHERE l.city = :city AND l.is_banned = false")
    Page<Lodge> findByCityAndIsBannedFalse(@Param("city") String city, Pageable pageable);
}
