package com.tfg.TFG.rest.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;

import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.User;
import com.tfg.TFG.model.entities.UserDao;
import com.tfg.TFG.model.services.UserService;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private static final String UPLOAD_DIR = "uploads/images/";

    /** The user service. */
    @Autowired
    private UserService userService;

    @Autowired
    private UserDao userDao;

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestAttribute Long userId, @RequestParam("file") MultipartFile file)
            throws InstanceNotFoundException {
        try {
            // Crear el directorio si no existe
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Buscar el usuario por su ID para obtener su email
            User user = userService.findById(userId);
            String email = user.getEmail();

            // Obtener el nombre original del archivo
            String originalFilename = file.getOriginalFilename();

            // Crear el nuevo nombre del archivo (email_nombreOriginal.extension)
            String newFilename = email + "_" + originalFilename;

            // Crear el archivo en la ubicación de destino con el nuevo nombre
            Path path = uploadPath.resolve(newFilename);
            Files.write(path, file.getBytes());

            // Guardar el nombre del archivo como avatar en el usuario
            user.setAvatar(newFilename);
            userDao.save(user); // Asegúrate de persistir el cambio en el usuario

            return ResponseEntity.ok(newFilename);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el archivo");
        }
    }

    @PostMapping("/uploadLodgeImage")
    public ResponseEntity<String> uploadLodgeImage(@RequestParam("lodgeEmail") String lodgeEmail,
            @RequestParam("file") MultipartFile file)
            throws InstanceNotFoundException {
        try {
            // Crear el directorio si no existe
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Obtener el nombre original del archivo
            String originalFilename = file.getOriginalFilename();

            // Crear el nuevo nombre del archivo (email_nombreOriginal.extension)
            String newFilename = lodgeEmail + "_" + originalFilename;

            // Crear el archivo en la ubicación de destino con el nuevo nombre
            Path path = uploadPath.resolve(newFilename);

            Files.write(path, file.getBytes());

            return ResponseEntity.ok(newFilename);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir el archivo");
        }
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getImageByName(@PathVariable String filename) {
        try {
            // Obtener la ruta del archivo
            Path path = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
            Resource resource = new UrlResource(path.toUri());

            // Verifica si el archivo existe
            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Devolver el archivo como recurso
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
