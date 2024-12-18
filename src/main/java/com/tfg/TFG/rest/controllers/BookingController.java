package com.tfg.TFG.rest.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Booking;
import com.tfg.TFG.model.entities.User;
import com.tfg.TFG.model.services.BookingService;
import com.tfg.TFG.model.services.UserService;
import com.tfg.TFG.model.services.exceptions.CancelBookingException;
import com.tfg.TFG.model.services.exceptions.PermissionException;
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

    @Autowired
    private UserService userService;

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

    @PostMapping("/cancelBooking/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void cancelBooking(@RequestAttribute Long userId, @PathVariable Long id)
            throws InstanceNotFoundException, PermissionException, CancelBookingException {
        System.out.println("cancel booking");
        try {
            bookingService.cancelBooking(userId, id);

        } catch (CancelBookingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cancellation cannot be done with less than a week in advance", e);
        }
    }
}