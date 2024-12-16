package com.tfg.TFG.rest.dtos.bookingDtos;

import com.tfg.TFG.rest.dtos.userDtos.UserDto;

public class BookingDto {
    private Long id;
    private String check_in;
    private String check_out;
    private String arrival_time;
    private String departure_time;
    private String booking_date;
    private double total_price;
    private Boolean is_reviewed;
    private Boolean is_cancelled;
    private Boolean is_api;
    private UserDto user;
    private String lodgeEmail;

    public interface AllValidations {
    }

    public interface UpdateValidations {
    }

    public BookingDto() {
    }

    public BookingDto(String check_in, String check_out, String arrival_time, String departure_time,
            String booking_date,
            double total_price, Boolean is_reviewed, Boolean is_cancelled, Boolean is_api, double price_per_night,
            UserDto user,
            String lodgeEmail) {
        this.check_in = check_in;
        this.check_out = check_out;
        this.arrival_time = arrival_time;
        this.departure_time = departure_time;
        this.booking_date = booking_date;
        this.total_price = total_price;
        this.is_reviewed = is_reviewed;
        this.is_cancelled = is_cancelled;
        this.is_api = is_api;
        this.user = user;
        this.lodgeEmail = lodgeEmail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCheck_in() {
        return check_in;
    }

    public void setCheck_in(String check_in) {
        this.check_in = check_in;
    }

    public String getCheck_out() {
        return check_out;
    }

    public void setCheck_out(String check_out) {
        this.check_out = check_out;
    }

    public String getArrival_time() {
        return arrival_time;
    }

    public void setArrival_time(String arrival_time) {
        this.arrival_time = arrival_time;
    }

    public String getDeparture_time() {
        return departure_time;
    }

    public void setDeparture_time(String departure_time) {
        this.departure_time = departure_time;
    }

    public String getBooking_date() {
        return booking_date;
    }

    public void setBooking_date(String booking_date) {
        this.booking_date = booking_date;
    }

    public double getTotal_price() {
        return total_price;
    }

    public void setTotal_price(double total_price) {
        this.total_price = total_price;
    }

    public Boolean getIs_reviewed() {
        return is_reviewed;
    }

    public void setIs_reviewed(Boolean is_reviewed) {
        this.is_reviewed = is_reviewed;
    }

    public Boolean getIs_cancelled() {
        return is_cancelled;
    }

    public void setIs_cancelled(Boolean is_cancelled) {
        this.is_cancelled = is_cancelled;
    }

    public Boolean getIs_api() {
        return is_api;
    }

    public void setIs_api(Boolean is_api) {
        this.is_api = is_api;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public String getLodgeEmail() {
        return lodgeEmail;
    }

    public void setLodgeEmail(String lodgeEmail) {
        this.lodgeEmail = lodgeEmail;
    }
}
