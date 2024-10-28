package com.tfg.TFG.model.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfg.TFG.model.entities.Lodge;
import com.tfg.TFG.model.entities.LodgeDao;

/**
 * The Class LodgeServiceImpl.
 */
@Service
@Transactional
public class LodgeServiceImpl implements LodgeService {

    @Autowired
    private LodgeDao lodgeDao;

    @Override
    public Page<Lodge> getLodges(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        return lodgeDao.findAllAndIsBannedFalse(pageRequest);
    }

    @Override
    public Page<Lodge> getLodgesByCountry(String country, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        return lodgeDao.findByCountryAndIsBannedFalse(country, pageRequest);
    }

    @Override
    public Page<Lodge> getLodgesByCity(String city, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        return lodgeDao.findByCityAndIsBannedFalse(city, pageRequest);
    }
}
