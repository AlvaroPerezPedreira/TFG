package com.tfg.TFG.model.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.*;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {
    @Autowired
    private LodgeDao lodgeDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private BookingDao bookingDao;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    public static LocalDate parseDate(String dateStr) {
        return LocalDate.parse(dateStr, formatter);
    }

    @Override
    public Booking createBooking(Long userId, String lodgeEmail, String checkIn, String checkOut, String arrivalTime,
            String departureTime, double totalPrice, Boolean is_api) throws InstanceNotFoundException {
        User user = userDao.findById(userId)
                .orElseThrow(() -> new InstanceNotFoundException(userId.toString(), User.class.getName()));
        Lodge lodge = lodgeDao.findByEmail(lodgeEmail)
                .orElseThrow(() -> new InstanceNotFoundException(lodgeEmail, Lodge.class.getName()));

        Booking booking = new Booking(checkIn, checkOut, arrivalTime, departureTime, totalPrice, is_api, user, lodge);
        booking.setIs_cancelled(false);
        booking.setIs_reviewed(false);

        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String bookingDate = currentDate.format(formatter);

        booking.setBooking_date(bookingDate);

        return bookingDao.save(booking);
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

}
