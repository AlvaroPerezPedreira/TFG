package com.tfg.TFG.model.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "User")
public class User {

    public enum RoleType {
        USER, PROPERTY_OWNER, ADMIN
    }

    public enum GenreType {
        MALE, FEMALE, NON_BINARY
    }

    @Id
    @GeneratedValue
    private Long id;

    private String email;
    private String password;
    private RoleType role = RoleType.USER;
    private String username;
    private String name;
    private String lastname;
    private String phone;
    private String birthDate;
    private String country;
    private GenreType genre;
    private String address;
    private String passport;
    private String avatar;

    // Constructores
    public User() {
    }

    public User(String email, String password, String rol, String username, String name, String lastname, String phone,
            String birthDate, String country, String genre, String address, String passport, String avatar) {
        this.email = email;
        this.password = password;

        if (rol.equals("USER")) {
            this.role = RoleType.USER;
        }
        if (rol.equals("PROPERTY_OWNER")) {
            this.role = RoleType.PROPERTY_OWNER;
        }

        this.username = username;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.birthDate = birthDate;
        this.country = country;

        if (genre.equals("MALE")) {
            this.genre = GenreType.MALE;
        }
        if (genre.equals("FEMALE")) {
            this.genre = GenreType.FEMALE;
        }
        if (genre.equals("NON_BINARY")) {
            this.genre = GenreType.NON_BINARY;
        }

        this.address = address;
        this.passport = passport;
        this.avatar = avatar;
    }

    // Id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Role
    public RoleType getRol() {
        return role;
    }

    public void setRol(RoleType role) {
        this.role = role;
    }

    // Username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Lastname
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    // Phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // BirthDate
    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    // Country
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    // Genre
    public GenreType getGenre() {
        return genre;
    }

    public void setGenre(GenreType genre) {
        this.genre = genre;
    }

    // Address
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // Passport
    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        this.passport = passport;
    }

    // Avatar
    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
