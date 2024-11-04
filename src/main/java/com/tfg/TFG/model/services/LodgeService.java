package com.tfg.TFG.model.services;

import java.util.Optional;

import org.springframework.data.domain.Page;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Lodge;

public interface LodgeService {
    Page<Lodge> getLodges(int page, int size);

    Page<Lodge> getLodgesByCountry(String country, int page, int size);

    Page<Lodge> getLodgesByCity(String city, int page, int size);

    Page<Lodge> getLodgesByPlace(String place, int page, int size);

    Lodge findByEmail(String email) throws InstanceNotFoundException;
}
