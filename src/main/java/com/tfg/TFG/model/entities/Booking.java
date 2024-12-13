package com.tfg.TFG.model.entities;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "Booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String check_in;

    @Column(nullable = false)
    private String check_out;

    @Column(nullable = false)
    private String arrival_time;

    @Column(nullable = false)
    private String departure_time;

    @Column(nullable = false)
    private String booking_date;

    @Column(nullable = false)
    private double total_price;

    @Column(nullable = false)
    private Boolean is_reviewed;

    @Column(nullable = false)
    private Boolean is_cancelled;

    @Column(nullable = false)
    private Boolean is_api;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lodge_id", nullable = false)
    private Lodge lodge;

    public Booking() {
    }

    public Booking(String check_in, String check_out, String arrival_time, String departure_time, double total_price,
            Boolean is_api,
            User user, Lodge lodge) {
        this.check_in = check_in;
        this.check_out = check_out;
        this.arrival_time = arrival_time;
        this.departure_time = departure_time;
        this.total_price = total_price;
        this.is_api = is_api;
        this.user = user;
        this.lodge = lodge;
    }

    // Id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Check_in
    public String getCheck_in() {
        return check_in;
    }

    public void setCheck_in(String check_in) {
        this.check_in = check_in;
    }

    // Check_out
    public String getCheck_out() {
        return check_out;
    }

    public void setCheck_out(String check_out) {
        this.check_out = check_out;
    }

    // Arrival_time
    public String getArrival_time() {
        return arrival_time;
    }

    public void setArrival_time(String arrival_time) {
        this.arrival_time = arrival_time;
    }

    // Departure_time
    public String getDeparture_time() {
        return departure_time;
    }

    public void setDeparture_time(String departure_time) {
        this.departure_time = departure_time;
    }

    // Booking_date
    public String getBooking_date() {
        return booking_date;
    }

    public void setBooking_date(String booking_date) {
        this.booking_date = booking_date;
    }

    // Total_price
    public double getTotal_price() {
        return total_price;
    }

    public void setTotal_price(double total_price) {
        this.total_price = total_price;
    }

    // Is_reviewed
    public Boolean getIs_reviewed() {
        return is_reviewed;
    }

    public void setIs_reviewed(Boolean is_reviewed) {
        this.is_reviewed = is_reviewed;
    }

    // Is_canceled
    public Boolean getIs_cancelled() {
        return is_cancelled;
    }

    public void setIs_cancelled(Boolean is_cancelled) {
        this.is_cancelled = is_cancelled;
    }

    // Is_api
    public Boolean getIs_api() {
        return is_api;
    }

    public void setIs_api(Boolean is_api) {
        this.is_api = is_api;
    }

    // User
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // Lodge
    public Lodge getLodge() {
        return lodge;
    }

    public void setLodge(Lodge lodge) {
        this.lodge = lodge;
    }
}
