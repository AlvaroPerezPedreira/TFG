package com.tfg.TFG.rest.controllers;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Lodge;
import com.tfg.TFG.model.entities.User;
import com.tfg.TFG.model.services.LodgeService;
import com.tfg.TFG.model.services.UserService;

import com.tfg.TFG.model.services.exceptions.PermissionException;
import com.tfg.TFG.rest.dtos.lodgeDtos.*;

/**
 * The Class LodgeController.
 */
@RestController
@RequestMapping("/api/lodges")
public class LodgeController {

    /** The user service. */
    @Autowired
    private LodgeService lodgeService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<Page<LodgeDto>> getLodges(@RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "9") int size) {

        System.out.println("getLodges");

        Page<LodgeDto> lodges = lodgeService.getLodges(page, size).map(LodgeConversor::toDto);

        return ResponseEntity.ok(lodges);
    }

    @GetMapping("/by-country")
    public ResponseEntity<Page<LodgeDto>> getLodgesByCountry(@RequestParam(name = "country") String country,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "9") int size) {

        System.out.println("getLodgesByCountry");

        Page<LodgeDto> lodges = lodgeService.getLodgesByCountry(country, page, size).map(LodgeConversor::toDto);

        return ResponseEntity.ok(lodges);
    }

    @GetMapping("/by-city")
    public ResponseEntity<Page<LodgeDto>> getLodgesByCity(@RequestParam(name = "city") String city,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "9") int size) {

        System.out.println("getLodgesByCity");

        Page<LodgeDto> lodges = lodgeService.getLodgesByCity(city, page, size).map(LodgeConversor::toDto);

        return ResponseEntity.ok(lodges);
    }

    @GetMapping("/by-place")
    public ResponseEntity<Page<LodgeDto>> getLodgesByPlace(@RequestParam(name = "place") String city,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "9") int size) {

        System.out.println("getLodgesByPlace");

        Page<LodgeDto> lodges = lodgeService.getLodgesByPlace(city, page, size).map(LodgeConversor::toDto);

        return ResponseEntity.ok(lodges);
    }

    @GetMapping("/{email}")
    public ResponseEntity<LodgeDto> getLodgeByEmail(@RequestAttribute Long userId, @PathVariable String email)
            throws InstanceNotFoundException, PermissionException {

        System.out.println("getLodgeByEmail");
        System.out.println(email);

        Lodge lodge = lodgeService.findByEmail(email);

        return ResponseEntity.ok(LodgeConversor.toDto(lodge));
    }

    @PostMapping("/createLodge")
    public ResponseEntity<LodgeDto> createLodge(@RequestAttribute Long userId,
            @Validated({ LodgeDto.AllValidations.class }) @RequestBody LodgeDto lodgeDto)
            throws InstanceNotFoundException {

        System.out.println("createLodge");

        Lodge lodge = lodgeService.createLodge(userId, lodgeDto.getLodge_email(), lodgeDto.getLodge_name(),
                lodgeDto.getLodge_description(),
                lodgeDto.getLodge_address(), lodgeDto.getLodge_phone(), lodgeDto.getCity(), lodgeDto.getCountry(),
                lodgeDto.getAvailable_rooms(), lodgeDto.getPrice_per_night(), lodgeDto.getCheck_in(),
                lodgeDto.getCheck_out(), lodgeDto.featuresToList(), lodgeDto.imagesToList());

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{email}")
                .buildAndExpand(lodge.getLodge_email())
                .toUri();

        return ResponseEntity.created(location).body(LodgeConversor.toDto(lodge));
    }

    @GetMapping("/getFeatures")
    public ResponseEntity<List<FeatureDto>> getAllFeatures() {

        System.out.println("getAllFeatures");

        List<FeatureDto> features = lodgeService.getAllFeatures().stream().map(FeatureConversor::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(features);
    }

    @GetMapping("/myLodges")
    public ResponseEntity<List<LodgeDto>> getMyLodges(@RequestAttribute Long userId) throws InstanceNotFoundException {

        System.out.println("get my lodges");

        List<LodgeDto> lodges = lodgeService.getLodgesByUserId(userId).stream().map(LodgeConversor::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(lodges);
    }

    @PostMapping("/closeLodge/{email}")
    @ResponseStatus(HttpStatus.OK)
    public void closeLodge(@RequestAttribute Long userId, @PathVariable String email)
            throws InstanceNotFoundException, PermissionException {
        System.out.println("closeLodge");

        User owner = userService.findById(userId);
        Lodge lodge = lodgeService.findByEmail(email);

        lodgeService.closeLodge(owner, lodge);
    }

    @PostMapping("/openLodge/{email}")
    @ResponseStatus(HttpStatus.OK)
    public void openLodge(@RequestAttribute Long userId, @PathVariable String email)
            throws InstanceNotFoundException, PermissionException {
        System.out.println("openLodge");

        User owner = userService.findById(userId);
        Lodge lodge = lodgeService.findByEmail(email);

        lodgeService.openLodge(owner, lodge);
    }

    @PutMapping("/updateLodge")
    @ResponseStatus(HttpStatus.OK)
    public LodgeDto updateLodge(@RequestAttribute Long userId,
            @Validated({ LodgeDto.AllValidations.class }) @RequestBody LodgeDto lodgeDto)
            throws InstanceNotFoundException, PermissionException {

        System.out.println("updateLodge");

        Lodge lodge = lodgeService.updateLodge(userId, lodgeDto.getLodge_email(), lodgeDto.getLodge_name(),
                lodgeDto.getLodge_description(),
                lodgeDto.getLodge_address(), lodgeDto.getLodge_phone(), lodgeDto.getCity(), lodgeDto.getCountry(),
                lodgeDto.getAvailable_rooms(), lodgeDto.getPrice_per_night(), lodgeDto.getCheck_in(),
                lodgeDto.getCheck_out(), lodgeDto.featuresToList(), lodgeDto.imagesToList());

        return (LodgeConversor.toDto(lodge));
    }

    @PostMapping("/banLodge/{email}")
    @ResponseStatus(HttpStatus.OK)
    public void banLodge(@RequestAttribute Long userId, @PathVariable String email)
            throws InstanceNotFoundException, PermissionException {

        System.out.println("ban lodge");

        User admin = userService.findById(userId);

        lodgeService.banLodge(admin, email);
    }

    @PostMapping("/unbanLodge/{email}")
    @ResponseStatus(HttpStatus.OK)
    public void unbanLodge(@RequestAttribute Long userId, @PathVariable String email)
            throws InstanceNotFoundException, PermissionException {

        System.out.println("unban lodge");

        User admin = userService.findById(userId);

        lodgeService.unbanLodge(admin, email);
    }

    @GetMapping("/findAllBannedLodges")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Page<LodgeDto>> findAllBannedLodges(@RequestAttribute Long userId)
            throws InstanceNotFoundException, PermissionException {

        System.out.println("Find all banned lodges");

        User admin = userService.findById(userId);

        Page<LodgeDto> lodges = lodgeService.findAllBannedLodges(admin, 0, 24).map(LodgeConversor::toDto);

        return ResponseEntity.ok(lodges);
    }
}
