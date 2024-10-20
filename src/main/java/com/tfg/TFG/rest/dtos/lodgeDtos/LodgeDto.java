package com.tfg.TFG.rest.dtos.lodgeDtos;

import java.util.List;

import com.tfg.TFG.rest.dtos.userDtos.UserDto;

public class LodgeDto {
    private Long id;
    private String lodge_name;
    private String lodge_description;
    private String lodge_address;
    private String lodge_phone;
    private String city;
    private String country;
    private int available_rooms;
    private double price_per_night;
    private String check_in;
    private String check_out;
    private Boolean is_closed;
    private String lodge_provider;
    private UserDto user;
    private List<Lodge_ImageDto> images;
    private List<FeatureDto> features;

    public LodgeDto() {
    }

    public LodgeDto(String lodge_name, String lodge_description, String lodge_address, String lodge_phone, String city,
            String country, int available_rooms, double price_per_night, String check_in, String check_out,
            Boolean is_closed, String lodge_provider, UserDto user, List<Lodge_ImageDto> images,
            List<FeatureDto> features) {
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
        this.lodge_provider = lodge_provider;
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

    public String getLodge_name() {
        return lodge_name;
    }

    public void setLodge_name(String lodge_name) {
        this.lodge_name = lodge_name;
    }

    public String getLodge_description() {
        return lodge_description;
    }

    public void setLodge_description(String lodge_description) {
        this.lodge_description = lodge_description;
    }

    public String getLodge_address() {
        return lodge_address;
    }

    public void setLodge_address(String lodge_address) {
        this.lodge_address = lodge_address;
    }

    public String getLodge_phone() {
        return lodge_phone;
    }

    public void setLodge_phone(String lodge_phone) {
        this.lodge_phone = lodge_phone;
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

    public String getLodge_provider() {
        return lodge_provider;
    }

    public void setLodge_provider(String lodge_provider) {
        this.lodge_provider = lodge_provider;
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
