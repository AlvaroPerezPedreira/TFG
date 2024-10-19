package com.tfg.TFG.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import com.tfg.TFG.model.services.LodgeService;

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

    @GetMapping("/")
    public ResponseEntity<Page<LodgeDto>> getLodges(@RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "9") int size) {

        System.out.println("getLodges");

        Page<LodgeDto> lodges = lodgeService.getLodges(page, size).map(LodgeConversor::toDto);

        return ResponseEntity.ok(lodges);
    }
}
