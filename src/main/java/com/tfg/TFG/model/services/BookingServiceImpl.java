package com.tfg.TFG.model.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.*;
import com.tfg.TFG.model.services.exceptions.CancelBookingException;
import com.tfg.TFG.model.services.exceptions.PermissionException;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {
    @Autowired
    private LodgeDao lodgeDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private BookingDao bookingDao;

    @Autowired
    private ReviewDao reviewDao;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    public static LocalDate parseDate(String dateStr) {
        return LocalDate.parse(dateStr, formatter);
    }

    @Override
    public Booking createBooking(Long userId, String lodgeEmail, String checkIn, String checkOut, String arrivalTime,
            String departureTime, double totalPrice, Boolean is_api) throws InstanceNotFoundException {
        User user = userDao.findById(userId)
                .orElseThrow(() -> new InstanceNotFoundException(userId.toString(), User.class.getName()));

        if (!is_api) {
            Lodge lodge = lodgeDao.findByEmail(lodgeEmail)
                    .orElseThrow(() -> new InstanceNotFoundException(lodgeEmail, Lodge.class.getName()));
            Booking booking = new Booking(checkIn, checkOut, arrivalTime, departureTime, totalPrice, lodgeEmail, is_api,
                    user,
                    lodge);

            booking.setIs_cancelled(false);
            booking.setIs_reviewed(false);

            LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            String bookingDate = currentDate.format(formatter);

            booking.setBooking_date(bookingDate);

            return bookingDao.save(booking);
        } else {

            Booking booking = new Booking(checkIn, checkOut, arrivalTime, departureTime, totalPrice, lodgeEmail, is_api,
                    user,
                    null);

            booking.setIs_cancelled(false);
            booking.setIs_reviewed(false);

            LocalDate currentDate = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
            String bookingDate = currentDate.format(formatter);

            booking.setBooking_date(bookingDate);

            return bookingDao.save(booking);
        }
    }

    @Override
    public List<Booking> getBookingsByUserId(Long userId) throws InstanceNotFoundException {
        return bookingDao.findByUserId(userId);
    }

    @Override
    public Boolean checkAvailability(String lodgeEmail, String ArrivalTime, String DepartureTime)
            throws InstanceNotFoundException {
        Lodge lodge = lodgeDao.findByEmail(lodgeEmail)
                .orElseThrow(() -> new InstanceNotFoundException(lodgeEmail, Lodge.class.getName()));

        List<Booking> bookings = bookingDao.findByLodgeId(lodge.getId());

        LocalDate newArrival = parseDate(ArrivalTime);
        LocalDate newDeparture = parseDate(DepartureTime);

        if (newArrival.isBefore(LocalDate.now())) {
            return false;
        }

        int count = 0;

        for (Booking booking : bookings) {
            LocalDate arrival = parseDate(booking.getArrival_time());
            LocalDate departure = parseDate(booking.getDeparture_time());

            if ((newArrival.isBefore(departure) || newArrival.isEqual(departure))
                    && (newDeparture.isAfter(arrival) || newDeparture.isEqual(arrival))) {
                count++;
            }

        }

        if (count >= lodge.getAvailable_rooms()) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public void cancelBooking(Long userId, Long bookingId)
            throws InstanceNotFoundException, PermissionException, CancelBookingException {

        User user = userDao.findById(userId)
                .orElseThrow(() -> new InstanceNotFoundException(userId.toString(), User.class.getName()));

        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new InstanceNotFoundException(bookingId.toString(), Booking.class.getName()));

        if (!booking.getUser().equals(user)) {
            throw new PermissionException();
        }

        LocalDate currentDate = LocalDate.now();
        LocalDate arrivalDate = LocalDate.parse(booking.getArrival_time(), formatter);

        // Cancelar con antelación de 1 semana
        if (arrivalDate.minusWeeks(1).isBefore(currentDate)) {
            throw new CancelBookingException();
        }

        booking.setIs_cancelled(true);
    }

    // Reviews

    @Override
    public Review createReview(Long userId, Long bookingId, String lodgeEmail, String reviewText, int rating)
            throws InstanceNotFoundException, PermissionException {
        User user = userDao.findById(userId)
                .orElseThrow(() -> new InstanceNotFoundException(userId.toString(), User.class.getName()));

        Booking booking = bookingDao.findById(bookingId)
                .orElseThrow(() -> new InstanceNotFoundException(bookingId.toString(), Booking.class.getName()));

        if (!booking.getUser().equals(user)) {
            throw new PermissionException();
        }

        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String reviewDate = currentDate.format(formatter);

        Review review = new Review(lodgeEmail, reviewDate, reviewText, rating, user, booking);

        review.setIs_blocked(false);

        booking.setIs_reviewed(true);

        return reviewDao.save(review);
    }

    public List<Review> getReviewsByLodgeEmail(String lodgeEmail) {
        return reviewDao.findByLodgeEmail(lodgeEmail);
    }

    @Override
    public Booking getBookingById(Long id) throws InstanceNotFoundException {
        return bookingDao.findById(id)
                .orElseThrow(() -> new InstanceNotFoundException(id.toString(), Booking.class.getName()));
    }

    @Override
    public Boolean hasReviews(String lodgeEmail) throws InstanceNotFoundException {
        return reviewDao.findByLodgeEmail(lodgeEmail).size() > 0;
    }

    @Override
    public void banReview(User admin, Long reviewId) throws InstanceNotFoundException, PermissionException {
        if (admin.getRole() != User.RoleType.ADMIN) {
            throw new PermissionException();
        }
        Review bannedReview = reviewDao.findById(reviewId)
                .orElseThrow(() -> new InstanceNotFoundException(reviewId.toString(), Review.class.getName()));

        bannedReview.setIs_blocked(true);
    }

}
