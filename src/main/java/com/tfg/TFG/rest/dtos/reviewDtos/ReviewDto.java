package com.tfg.TFG.rest.dtos.reviewDtos;

import com.tfg.TFG.rest.dtos.bookingDtos.BookingDto;
import com.tfg.TFG.rest.dtos.userDtos.UserDto;

public class ReviewDto {
    private Long id;
    private String review_lodgeEmail;
    private String review_date;
    private String review_text;
    private int rating;
    private Boolean is_blocked;
    private UserDto user;
    private BookingDto booking;

    public interface AllValidations {
    }

    public interface UpdateValidations {
    }

    public ReviewDto() {
    }

    public ReviewDto(String review_lodgeEmail, String review_date, String review_text, int rating, Boolean is_blocked,
            UserDto user, BookingDto booking) {
        this.review_lodgeEmail = review_lodgeEmail;
        this.review_date = review_date;
        this.review_text = review_text;
        this.rating = rating;
        this.is_blocked = is_blocked;
        this.user = user;
        this.booking = booking;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReview_lodgeEmail() {
        return review_lodgeEmail;
    }

    public void setReview_lodgeEmail(String review_lodgeEmail) {
        this.review_lodgeEmail = review_lodgeEmail;
    }

    public String getReview_date() {
        return review_date;
    }

    public void setReview_date(String review_date) {
        this.review_date = review_date;
    }

    public String getReview_text() {
        return review_text;
    }

    public void setReview_text(String review_text) {
        this.review_text = review_text;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Boolean getIs_blocked() {
        return is_blocked;
    }

    public void setIs_blocked(Boolean is_blocked) {
        this.is_blocked = is_blocked;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public BookingDto getBooking() {
        return booking;
    }

    public void setBooking(BookingDto booking) {
        this.booking = booking;
    }
}
