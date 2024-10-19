package com.tfg.TFG.model.entities;

import java.math.BigDecimal;
import java.util.List;
import jakarta.persistence.*;

@Entity
@Table(name = "Lodge")
public class Lodge {

    public enum HotelProvider {
        DeepDive, Others;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String hotel_name;

    @Column(nullable = false)
    private String hotel_description;

    @Column(nullable = false)
    private String hotel_address;

    @Column(nullable = false)
    private String hotel_phone;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String country;

    @Column(nullable = false)
    private int available_rooms;

    @Column(nullable = false)
    private double price_per_night;

    @Column(nullable = false)
    private String check_in;

    @Column(nullable = false)
    private String check_out;

    @Column(nullable = false)
    private Boolean is_closed;

    @Column(nullable = false)
    private HotelProvider hotel_provider;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "lodge", cascade = CascadeType.ALL)
    private List<Lodge_Image> images;

    @ManyToMany
    @JoinTable(name = "Lodge_Feature", joinColumns = @JoinColumn(name = "lodge_id"), inverseJoinColumns = @JoinColumn(name = "feature_id"))
    private List<Feature> features;

    // Constructores
    public Lodge() {
    }

    public Lodge(String hotel_name, String hotel_description, String hotel_address, String hotel_phone, String city,
            String country, int available_rooms, double price_per_night, String check_in, String check_out,
            Boolean is_closed, /* List<Lodge_Image> images, */ User user) {
        this.hotel_name = hotel_name;
        this.hotel_description = hotel_description;
        this.hotel_address = hotel_address;
        this.hotel_phone = hotel_phone;
        this.city = city;
        this.country = country;
        this.available_rooms = available_rooms;
        this.price_per_night = price_per_night;
        this.check_in = check_in;
        this.check_out = check_out;
        this.is_closed = is_closed;
        // this.images = images;
        this.user = user;
    }

    // Id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Name
    public String getHotel_name() {
        return hotel_name;
    }

    public void setHotel_name(String hotel_name) {
        this.hotel_name = hotel_name;
    }

    // Description
    public String getHotel_description() {
        return hotel_description;
    }

    public void setHotel_description(String hotel_description) {
        this.hotel_description = hotel_description;
    }

    // Address
    public String getHotel_address() {
        return hotel_address;
    }

    public void setHotel_address(String hotel_address) {
        this.hotel_address = hotel_address;
    }

    // Phone
    public String getHotel_phone() {
        return hotel_phone;
    }

    public void setHotel_phone(String hotel_phone) {
        this.hotel_phone = hotel_phone;
    }

    // City
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    // Country
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    // Available rooms
    public Integer getAvailable_rooms() {
        return available_rooms;
    }

    public void setAvailable_rooms(Integer available_rooms) {
        this.available_rooms = available_rooms;
    }

    // Price per night
    public double getPrice_per_night() {
        return price_per_night;
    }

    public void setPrice_per_night(double price_per_night) {
        this.price_per_night = price_per_night;
    }

    // Check in
    public String getCheck_in() {
        return check_in;
    }

    public void setCheck_in(String check_in) {
        this.check_in = check_in;
    }

    // Check out
    public String getCheck_out() {
        return check_out;
    }

    public void setCheck_out(String check_out) {
        this.check_out = check_out;
    }

    // Is closed
    public Boolean getIs_closed() {
        return is_closed;
    }

    public void setIs_closed(Boolean is_closed) {
        this.is_closed = is_closed;
    }

    // Hotel provider
    public HotelProvider getHotel_provider() {
        return hotel_provider;
    }

    public void setHotel_provider(HotelProvider hotel_provider) {
        this.hotel_provider = hotel_provider;
    }

    // User
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    // Images
    public List<Lodge_Image> getImages() {
        return images;
    }

    public void setImages(List<Lodge_Image> images) {
        this.images = images;
    }

    // Features
    public List<Feature> getFeatures() {
        return features;
    }

    public void setFeatures(List<Feature> features) {
        this.features = features;
    }
}
