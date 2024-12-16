package com.tfg.TFG.model.services;

import java.util.List;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Booking;

public interface BookingService {
    Booking createBooking(Long userId, String lodgeEmail, String checkIn, String checkOut, String arrivalTime,
            String departureTime, double totalPrice, Boolean is_api) throws InstanceNotFoundException;

    List<Booking> getBookingsByUserId(Long userId) throws InstanceNotFoundException;

    Boolean checkAvailability(String lodgeEmail, String checkIn, String checkOut) throws InstanceNotFoundException;
}
