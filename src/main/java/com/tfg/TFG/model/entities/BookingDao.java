package com.tfg.TFG.model.entities;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingDao extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);

    List<Booking> findByLodgeId(Long lodgeId);
}
