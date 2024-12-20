package com.tfg.TFG.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String review_lodgeEmail;

    @Column(nullable = false)
    private String review_date;

    @Column(nullable = false)
    private String review_text;

    @Column(nullable = false)
    private int rating;

    @Column(nullable = false)
    private Boolean is_blocked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    public Review() {
    }

    public Review(String review_lodgeEmail, String review_date, String review_text, int rating, Boolean is_blocked,
            User user, Booking booking) {
        this.review_lodgeEmail = review_lodgeEmail;
        this.review_date = review_date;
        this.review_text = review_text;
        this.rating = rating;
        this.user = user;
        this.booking = booking;
    }

    // Id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Review_lodgeEmail
    public String getReview_lodgeEmail() {
        return review_lodgeEmail;
    }

    public void setReview_lodgeEmail(String review_lodgeEmail) {
        this.review_lodgeEmail = review_lodgeEmail;
    }

    // Review_date
    public String getReview_date() {
        return review_date;
    }

    public void setReview_date(String review_date) {
        this.review_date = review_date;
    }

    // Review_text
    public String getReview_text() {
        return review_text;
    }

    public void setReview_text(String review_text) {
        this.review_text = review_text;
    }

    // Rating
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    // Is_blocked
    public Boolean getIs_blocked() {
        return is_blocked;
    }

    public void setIs_blocked(Boolean is_blocked) {
        this.is_blocked = is_blocked;
    }

    // User
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // Booking
    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }
}
