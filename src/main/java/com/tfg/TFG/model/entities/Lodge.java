package com.tfg.TFG.model.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "Lodge")
public class Lodge {

    public enum LodgeProvider {
        DeepDive, Others;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String lodge_email;

    @Column(nullable = false)
    private String lodge_name;

    @Column(nullable = false)
    private String lodge_description;

    @Column(nullable = false)
    private String lodge_address;

    @Column(nullable = false)
    private String lodge_phone;

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
    private LodgeProvider lodge_provider;

    @Column(nullable = false)
    private Boolean is_banned;

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

    public Lodge(String lodge_email, String lodge_name, String lodge_description, String lodge_address,
            String lodge_phone, String city,
            String country, int available_rooms, double price_per_night, String check_in, String check_out,
            User user) {
        this.lodge_email = lodge_email;
        this.lodge_name = lodge_name;
        this.lodge_description = lodge_description;
        this.lodge_address = lodge_address;
        this.lodge_phone = lodge_phone;
        this.city = city;
        this.country = country;
        this.available_rooms = available_rooms;
        this.price_per_night = price_per_night;
        this.check_in = check_in;
        this.check_out = check_out;
        this.user = user;
    }

    public Lodge(String lodge_email, String lodge_name, String lodge_description, String lodge_address,
            String lodge_phone, String city,
            String country, int available_rooms, double price_per_night, String check_in, String check_out,
            Boolean is_closed, User user) {
        this.lodge_email = lodge_email;
        this.lodge_name = lodge_name;
        this.lodge_description = lodge_description;
        this.lodge_address = lodge_address;
        this.lodge_phone = lodge_phone;
        this.city = city;
        this.country = country;
        this.available_rooms = available_rooms;
        this.price_per_night = price_per_night;
        this.check_in = check_in;
        this.check_out = check_out;
        this.is_closed = is_closed;
        this.user = user;
    }

    // Id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Email
    public String getLodge_email() {
        return lodge_email;
    }

    public void setLodge_email(String lodge_email) {
        this.lodge_email = lodge_email;
    }

    // Name
    public String getLodge_name() {
        return lodge_name;
    }

    public void setLodge_name(String lodge_name) {
        this.lodge_name = lodge_name;
    }

    // Description
    public String getLodge_description() {
        return lodge_description;
    }

    public void setLodge_description(String lodge_description) {
        this.lodge_description = lodge_description;
    }

    // Address
    public String getLodge_address() {
        return lodge_address;
    }

    public void setLodge_address(String lodge_address) {
        this.lodge_address = lodge_address;
    }

    // Phone
    public String getLodge_phone() {
        return lodge_phone;
    }

    public void setLodge_phone(String lodge_phone) {
        this.lodge_phone = lodge_phone;
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
    public int getAvailable_rooms() {
        return available_rooms;
    }

    public void setAvailable_rooms(int available_rooms) {
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

    // Lodge provider
    public LodgeProvider getLodge_provider() {
        return lodge_provider;
    }

    public void setLodge_provider(LodgeProvider lodge_provider) {
        this.lodge_provider = lodge_provider;
    }

    // Is banned
    public Boolean getIs_banned() {
        return is_banned;
    }

    public void setIs_banned(Boolean is_banned) {
        this.is_banned = is_banned;
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
