package com.tfg.TFG.model.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import com.tfg.TFG.model.services.exceptions.PermissionException;

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
    public Lodge updateLodge(Long userId, String lodgeEmail, String lodgeName, String lodgeDescription,
            String lodgeAddress, String lodgePhone, String city, String country, int availabeRooms,
            double pricePerNight, String checkIn, String checkOut, List<Long> featureIds, List<String> imageUrls)
            throws InstanceNotFoundException, PermissionException {

        Optional<Lodge> lodgeOptional = lodgeDao.findByEmail(lodgeEmail);

        if (lodgeOptional.isEmpty()) {
            throw new InstanceNotFoundException("project.entities.lodge", lodgeEmail);
        }

        Lodge lodge = lodgeOptional.get();

        Optional<User> owner = userDao.findById(userId);

        if (lodge.getUser() != owner.get()) {
            throw new PermissionException();
        }

        lodge.setLodge_name(lodgeName);
        lodge.setLodge_description(lodgeDescription);
        lodge.setLodge_address(lodgeAddress);
        lodge.setLodge_phone(lodgePhone);
        lodge.setCity(city);
        lodge.setCountry(country);
        lodge.setAvailable_rooms(availabeRooms);
        lodge.setPrice_per_night(pricePerNight);
        lodge.setCheck_in(checkIn);
        lodge.setCheck_out(checkOut);

        List<Feature> features = featureDao.findAllById(featureIds);
        lodge.setFeatures(features);

        // Lista de imágenes actuales del lodge
        List<String> existingImageUrls = new ArrayList<>();
        for (Lodge_Image lodgeImage : lodge.getImages()) {
            existingImageUrls.add(lodgeImage.getImage_url());
        }

        // Filtrar las URLs de las nuevas imágenes que no existen aún
        List<String> newImageUrls = new ArrayList<>();
        for (String imageUrl : imageUrls) {
            // Si la imagen no existe en el directorio ni está en el sistema, agregarla
            if (!existingImageUrls.contains(imageUrl) && !imageExists(imageUrl)) {
                newImageUrls.add(imageUrl);
            }
        }

        // Añadir solo las nuevas imágenes
        List<Lodge_Image> newLodgeImages = new ArrayList<>();
        for (String imageUrl : newImageUrls) {
            Lodge_Image lodgeImage = new Lodge_Image();
            lodgeImage.setImage_url(lodgeEmail + "_" + imageUrl);
            lodgeImage.setLodge(lodge);
            newLodgeImages.add(lodgeImage);
            imageDao.save(lodgeImage); // Guardar la nueva imagen
        }

        // Añadir las nuevas imágenes a la lista del lodge
        lodge.getImages().addAll(newLodgeImages);

        Lodge savedLodge = lodgeDao.save(lodge);

        return savedLodge;
    }

    // Función para verificar si la imagen existe en el sistema
    private boolean imageExists(String imageUrl) {
        Path path = Paths.get("uploads/images", imageUrl); // Ruta del directorio de imágenes
        System.out.println("IMAGE TEST" + path + "\n" + imageUrl);
        return Files.exists(path); // Devuelve true si el archivo ya existe en el sistema
    }

    @Override
    public List<Feature> getAllFeatures() {
        return featureDao.findAll();
    }

    @Override
    public List<Lodge> getLodgesByUserId(Long userId) throws InstanceNotFoundException {
        return lodgeDao.findByUserId(userId);
    }

    @Override
    public void closeLodge(User user, Lodge lodge) throws InstanceNotFoundException, PermissionException {
        if (!lodge.getUser().equals(user)) {
            throw new PermissionException();
        }

        lodge.setIs_closed(true);
    }

    @Override
    public void openLodge(User user, Lodge lodge) throws InstanceNotFoundException, PermissionException {
        if (!lodge.getUser().equals(user)) {
            throw new PermissionException();
        }

        lodge.setIs_closed(false);
    }

    @Override
    public void banLodge(User admin, String bannedLodgeEmail) throws InstanceNotFoundException, PermissionException {
        if (admin.getRole() != User.RoleType.ADMIN) {
            throw new PermissionException();
        }
        Lodge bannedLodge = lodgeDao.findByEmail(bannedLodgeEmail)
                .orElseThrow(() -> new InstanceNotFoundException("project.entities.lodge", bannedLodgeEmail));

        bannedLodge.setIs_banned(true);
    }

    @Override
    public void unbanLodge(User admin, String bannedLodgeEmail) throws InstanceNotFoundException, PermissionException {
        if (admin.getRole() != User.RoleType.ADMIN) {
            throw new PermissionException();
        }
        Lodge bannedLodge = lodgeDao.findByEmail(bannedLodgeEmail)
                .orElseThrow(() -> new InstanceNotFoundException("project.entities.lodge", bannedLodgeEmail));

        bannedLodge.setIs_banned(false);
    }

    @Override
    public Page<Lodge> findAllBannedLodges(User admin, int page, int size) throws PermissionException {
        if (admin.getRole() != User.RoleType.ADMIN) {
            throw new PermissionException();
        }

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));

        return lodgeDao.findAllBannedLodges(pageRequest);
    }

}
