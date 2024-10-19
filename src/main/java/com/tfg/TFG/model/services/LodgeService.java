package com.tfg.TFG.model.services;

import org.springframework.data.domain.Page;

import com.tfg.TFG.model.entities.Lodge;

public interface LodgeService {
    Page<Lodge> getLodges(int page, int size);
}
