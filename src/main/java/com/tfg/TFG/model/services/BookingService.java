package com.tfg.TFG.model.services;

import java.util.List;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Booking;
import com.tfg.TFG.model.entities.Review;
import com.tfg.TFG.model.services.exceptions.CancelBookingException;
import com.tfg.TFG.model.services.exceptions.PermissionException;

public interface BookingService {
        Booking createBooking(Long userId, String lodgeEmail, String checkIn, String checkOut, String arrivalTime,
                        String departureTime, double totalPrice, Boolean is_api) throws InstanceNotFoundException;

        List<Booking> getBookingsByUserId(Long userId) throws InstanceNotFoundException;

        Boolean checkAvailability(String lodgeEmail, String checkIn, String checkOut) throws InstanceNotFoundException;

        void cancelBooking(Long userId, Long bookingId)
                        throws InstanceNotFoundException, PermissionException, CancelBookingException;

        Review createReview(Long userId, Long bookingId, String lodgeEmail, String reviewText, int rating)
                        throws InstanceNotFoundException, PermissionException;

        List<Review> getReviewsByLodgeEmail(String lodgeEmail);

        Booking getBookingById(Long id) throws InstanceNotFoundException;
}
