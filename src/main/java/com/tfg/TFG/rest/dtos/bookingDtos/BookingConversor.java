package com.tfg.TFG.rest.dtos.bookingDtos;

import org.springframework.beans.factory.annotation.Autowired;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Booking;
import com.tfg.TFG.model.entities.Lodge;
import com.tfg.TFG.model.entities.Lodge.LodgeProvider;
import com.tfg.TFG.model.services.LodgeService;
import com.tfg.TFG.rest.dtos.lodgeDtos.LodgeConversor;
import com.tfg.TFG.rest.dtos.userDtos.UserConversor;

public class BookingConversor {

    public static BookingDto toDto(Booking booking) {
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(booking.getId());
        bookingDto.setCheck_in(booking.getCheck_in());
        bookingDto.setCheck_out(booking.getCheck_out());
        bookingDto.setArrival_time(booking.getArrival_time());
        bookingDto.setDeparture_time(booking.getDeparture_time());
        bookingDto.setBooking_date(booking.getBooking_date());
        bookingDto.setTotal_price(booking.getTotal_price());
        bookingDto.setIs_reviewed(booking.getIs_reviewed());
        bookingDto.setIs_cancelled(booking.getIs_cancelled());
        bookingDto.setIs_api(booking.getIs_api());
        bookingDto.setUser(UserConversor.toUserDto(booking.getUser()));
        bookingDto.setLodgeEmail(booking.getLodge().getLodge_email());

        return bookingDto;
    }

    public static Booking toEntity(BookingDto bookingDto, LodgeService lodgeService) throws InstanceNotFoundException {
        Booking booking = new Booking();
        booking.setId(bookingDto.getId());
        booking.setCheck_in(bookingDto.getCheck_in());
        booking.setCheck_out(bookingDto.getCheck_out());
        booking.setArrival_time(bookingDto.getArrival_time());
        booking.setDeparture_time(bookingDto.getDeparture_time());
        booking.setBooking_date(bookingDto.getBooking_date());
        booking.setTotal_price(bookingDto.getTotal_price());
        booking.setIs_reviewed(bookingDto.getIs_reviewed());
        booking.setIs_cancelled(bookingDto.getIs_cancelled());
        booking.setIs_api(bookingDto.getIs_api());
        booking.setUser(UserConversor.toUser(bookingDto.getUser()));

        Lodge lodge = lodgeService.findByEmail(bookingDto.getLodgeEmail());

        booking.setLodge(lodge);

        return booking;
    }
}
