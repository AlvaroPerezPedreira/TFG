package com.tfg.TFG.model.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Feature;
import com.tfg.TFG.model.entities.Lodge;
import com.tfg.TFG.model.entities.User;
import com.tfg.TFG.model.services.exceptions.PermissionException;

public interface LodgeService {
    Page<Lodge> getLodges(int page, int size);

    Page<Lodge> getLodgesByCountry(String country, int page, int size);

    Page<Lodge> getLodgesByCity(String city, int page, int size);

    Page<Lodge> getLodgesByPlace(String place, int page, int size);

    Lodge findByEmail(String email) throws InstanceNotFoundException;

    Lodge createLodge(Long userId, String lodgeEmail, String lodgeName, String lodgeDescriptoin,
            String lodgeAddress, String lodgePhone, String city, String country, int availabeRooms,
            double pricePerNight, String checkIn, String checkOut, List<Long> featureIds, List<String> imageUrls)
            throws InstanceNotFoundException;

    List<Feature> getAllFeatures();

    List<Lodge> getLodgesByUserId(Long userId) throws InstanceNotFoundException;

    void closeLodge(User user, Lodge lodge) throws InstanceNotFoundException, PermissionException;

    void openLodge(User user, Lodge lodge) throws InstanceNotFoundException, PermissionException;

}