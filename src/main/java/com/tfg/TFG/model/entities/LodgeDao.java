package com.tfg.TFG.model.entities;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LodgeDao extends JpaRepository<Lodge, Long> {
    Page<Lodge> findByCountry(String country, Pageable pageable);

    Page<Lodge> findByCity(String city, Pageable pageable);
}
