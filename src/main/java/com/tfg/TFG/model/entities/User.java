package com.tfg.TFG.model.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "User")
public class User {

    public enum RoleType {
        USER, ADMIN
    }

    public enum StatusType {
        ACTIVE, BANNED
    }

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private RoleType role;

    @Column(nullable = false)
    private String username;

    private String name;
    private String lastname;
    private String phone;

    @Column(nullable = false)
    private String birthdate;

    private String country;

    @Column(nullable = false)
    private String gender;

    private String address;
    private String passport;
    private String avatar;

    @Column(nullable = false)
    public StatusType status;

    // Constructores
    public User() {
    }

    public User(String email, String password, String username, String birthdate, String gender) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.birthdate = birthdate;
        this.gender = gender;
    }

    // Constructor sin ID, ni Avatar
    public User(String email, String password, String username, String name, String lastname, String phone,
            String birthdate, String country, String gender, String address, String passport) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.birthdate = birthdate;
        this.country = country;
        this.gender = gender;
        this.address = address;
        this.passport = passport;
    }

    // Constructor sin ID
    public User(String email, String password, String username, String name, String lastname, String phone,
            String birthdate, String country, String gender, String address, String passport, String avatar) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.birthdate = birthdate;
        this.country = country;
        this.gender = gender;
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
    public RoleType getRole() {
        return role;
    }

    public void setRole(RoleType role) {
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

    // Birthdate
    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    // Country
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    // gender
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
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

    // Status
    public StatusType getStatus() {
        return status;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }
}
