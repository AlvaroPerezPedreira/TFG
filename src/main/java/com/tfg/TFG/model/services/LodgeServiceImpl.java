package com.tfg.TFG.model.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Feature;
import com.tfg.TFG.model.entities.FeatureDao;
import com.tfg.TFG.model.entities.Lodge;
import com.tfg.TFG.model.entities.LodgeDao;
import com.tfg.TFG.model.entities.Lodge_Image;
import com.tfg.TFG.model.entities.Lodge_ImageDao;
import com.tfg.TFG.model.entities.User;
import com.tfg.TFG.model.entities.UserDao;
import com.tfg.TFG.model.entities.Lodge.LodgeProvider;

/**
 * The Class LodgeServiceImpl.
 */
@Service
@Transactional
public class LodgeServiceImpl implements LodgeService {

    @Autowired
    private LodgeDao lodgeDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private FeatureDao featureDao;

    @Autowired
    private Lodge_ImageDao imageDao;

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

    @Override
    public Page<Lodge> getLodgesByPlace(String place, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        return lodgeDao.findByPlaceAndIsBannedFalse(place, pageRequest);
    }

    @Override
    public Lodge findByEmail(String email) throws InstanceNotFoundException {
        return lodgeDao.findByEmail(email)
                .orElseThrow(() -> new InstanceNotFoundException("project.entities.lodge", email));
    }

    @Override
    public Lodge createLodge(Long userId, String lodgeEmail, String lodgeName, String lodgeDescription,
            String lodgeAddress, String lodgePhone, String city, String country, int availabeRooms,
            double pricePerNight, String checkIn, String checkOut, List<Long> featureIds, List<String> imageUrls)
            throws InstanceNotFoundException {
        Optional<User> userOptional = userDao.findById(userId);
        if (userOptional.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.user", userId);
        }
        User user = userOptional.get();

        Lodge lodge = new Lodge(lodgeEmail, lodgeName, lodgeDescription, lodgeAddress, lodgePhone, city, country,
                availabeRooms, pricePerNight, checkIn, checkOut, user);
        lodge.setIs_banned(false);
        lodge.setLodge_provider(LodgeProvider.DeepDive);
        lodge.setIs_closed(false);

        List<Feature> features = featureDao.findAllById(featureIds);
        lodge.setFeatures(features);

        Lodge savedLodge = lodgeDao.save(lodge);

        List<Lodge_Image> lodgeImages = new ArrayList<>();
        for (String imageUrl : imageUrls) {
            Lodge_Image lodgeImage = new Lodge_Image();
            lodgeImage.setImage_url(imageUrl);
            lodgeImage.setLodge(savedLodge);
            lodgeImages.add(lodgeImage);
            imageDao.save(lodgeImage);
        }

        savedLodge.setImages(lodgeImages);

        return savedLodge;
    }

    @Override
    public List<Feature> getAllFeatures() {
        return featureDao.findAll();
    }

}
