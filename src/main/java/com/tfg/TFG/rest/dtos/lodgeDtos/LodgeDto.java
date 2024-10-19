package com.tfg.TFG.rest.dtos.lodgeDtos;

import java.util.List;

import com.tfg.TFG.rest.dtos.userDtos.UserDto;

public class LodgeDto {
    private Long id;
    private String hotel_name;
    private String hotel_description;
    private String hotel_address;
    private String hotel_phone;
    private String city;
    private String country;
    private int available_rooms;
    private double price_per_night;
    private String check_in;
    private String check_out;
    private Boolean is_closed;
    private String hotel_provider;
    private UserDto user;
    private List<Lodge_ImageDto> images;
    private List<FeatureDto> features;

    public LodgeDto() {
    }

    public LodgeDto(String hotel_name, String hotel_description, String hotel_address, String hotel_phone, String city,
            String country, int available_rooms, double price_per_night, String check_in, String check_out,
            Boolean is_closed, String hotel_provider, UserDto user, List<Lodge_ImageDto> images,
            List<FeatureDto> features) {
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
        this.hotel_provider = hotel_provider;
        this.user = user;
        this.images = images;
        this.features = features;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHotel_name() {
        return hotel_name;
    }

    public void setHotel_name(String hotel_name) {
        this.hotel_name = hotel_name;
    }

    public String getHotel_description() {
        return hotel_description;
    }

    public void setHotel_description(String hotel_description) {
        this.hotel_description = hotel_description;
    }

    public String getHotel_address() {
        return hotel_address;
    }

    public void setHotel_address(String hotel_address) {
        this.hotel_address = hotel_address;
    }

    public String getHotel_phone() {
        return hotel_phone;
    }

    public void setHotel_phone(String hotel_phone) {
        this.hotel_phone = hotel_phone;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public int getAvailable_rooms() {
        return available_rooms;
    }

    public void setAvailable_rooms(int available_rooms) {
        this.available_rooms = available_rooms;
    }

    public double getPrice_per_night() {
        return price_per_night;
    }

    public void setPrice_per_night(double price_per_night) {
        this.price_per_night = price_per_night;
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

    public Boolean getIs_closed() {
        return is_closed;
    }

    public void setIs_closed(Boolean is_closed) {
        this.is_closed = is_closed;
    }

    public String getHotel_provider() {
        return hotel_provider;
    }

    public void setHotel_provider(String hotel_provider) {
        this.hotel_provider = hotel_provider;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public List<Lodge_ImageDto> getImages() {
        return images;
    }

    public void setImages(List<Lodge_ImageDto> images) {
        this.images = images;
    }

    public List<FeatureDto> getFeatures() {
        return features;
    }

    public void setFeatures(List<FeatureDto> features) {
        this.features = features;
    }
}
