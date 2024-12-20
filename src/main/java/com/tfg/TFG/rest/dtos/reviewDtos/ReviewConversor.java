package com.tfg.TFG.rest.dtos.reviewDtos;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Review;
import com.tfg.TFG.model.services.LodgeService;
import com.tfg.TFG.rest.dtos.bookingDtos.BookingConversor;
import com.tfg.TFG.rest.dtos.userDtos.UserConversor;

public class ReviewConversor {
    public static ReviewDto toDto(Review review) {
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.setId(review.getId());
        reviewDto.setReview_lodgeEmail(review.getReview_lodgeEmail());
        reviewDto.setReview_date(review.getReview_date());
        reviewDto.setReview_text(review.getReview_text());
        reviewDto.setRating(review.getRating());
        reviewDto.setIs_blocked(review.getIs_blocked());
        reviewDto.setUser(UserConversor.toUserDto(review.getUser()));
        reviewDto.setBooking(BookingConversor.toDto(review.getBooking()));

        return reviewDto;
    }

    public static Review toEntity(ReviewDto reviewDto, LodgeService lodgeService) throws InstanceNotFoundException {
        Review review = new Review();
        review.setId(reviewDto.getId());
        review.setReview_lodgeEmail(reviewDto.getReview_lodgeEmail());
        review.setReview_date(reviewDto.getReview_date());
        review.setReview_text(reviewDto.getReview_text());
        review.setRating(reviewDto.getRating());
        review.setIs_blocked(reviewDto.getIs_blocked());
        review.setUser(UserConversor.toUser(reviewDto.getUser()));
        review.setBooking(BookingConversor.toEntity(reviewDto.getBooking(), lodgeService));

        return review;
    }
}