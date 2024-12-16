package com.tfg.TFG.rest.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Booking;

import com.tfg.TFG.model.services.BookingService;

import com.tfg.TFG.rest.dtos.bookingDtos.BookingConversor;
import com.tfg.TFG.rest.dtos.bookingDtos.BookingDto;

/**
 * The Class LodgeController.
 */
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/myBookings")
    public ResponseEntity<List<BookingDto>> getMyBookings(@RequestAttribute Long userId)
            throws InstanceNotFoundException {
        System.out.println("get my bookings");

        List<BookingDto> bookings = bookingService.getBookingsByUserId(userId).stream().map(BookingConversor::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(bookings);
    }

    @PostMapping("/createBooking")
    public ResponseEntity<BookingDto> createBooking(@RequestAttribute Long userId,
            @Validated({ BookingDto.AllValidations.class }) @RequestBody BookingDto bookingDto)
            throws InstanceNotFoundException {
        System.out.println("create booking");

        Booking booking = bookingService.createBooking(userId, bookingDto.getLodgeEmail(), bookingDto.getCheck_in(),
                bookingDto.getCheck_out(),
                bookingDto.getArrival_time(), bookingDto.getDeparture_time(), bookingDto.getTotal_price(),
                bookingDto.getIs_api());

        return ResponseEntity.ok(BookingConversor.toDto(booking));
    }

    @GetMapping("/checkAvailability")
    public Boolean checkAvailabilty(@RequestParam String lodgeEmail, @RequestParam String check_in,
            @RequestParam String check_out) throws InstanceNotFoundException {
        System.out.println("check availability");

        return bookingService.checkAvailability(lodgeEmail, check_in, check_out);
    }
}