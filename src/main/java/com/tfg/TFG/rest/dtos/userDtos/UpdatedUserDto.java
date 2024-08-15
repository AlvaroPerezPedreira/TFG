package com.tfg.TFG.rest.dtos.userDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * The Class UserDto.
 */
public class UpdatedUserDto {

    /** The user username. */
    private String username;

    /** The user name. */
    private String name;

    /** The last name. */
    private String lastname;

    /** The user phone. */
    private String phone;

    /** The user birth date. */
    private String birthdate;

    /** The user country. */
    private String country;

    /** The user gender. */
    private String gender;

    /** The user address. */
    private String address;

    /** The user passport. */
    private String passport;

    /**
     * The Interface AllValidations.
     */
    public interface AllValidations {
    }

    /**
     * The Interface UpdateValidations.
     */
    public interface UpdateValidations {
    }

    /**
     * Instantiates a new user dto.
     */
    public UpdatedUserDto() {
    }

    public UpdatedUserDto(String username, String name, String lastname, String phone, String birthdate, String country,
            String gender, String address, String passport) {

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

    // Username
    @NotNull(groups = { AllValidations.class })
    @Size(min = 1, max = 60, groups = { AllValidations.class })
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        if (username != null) {
            this.username = username.trim();
        }

    }

    // Name
    @Size(min = 1, max = 60, groups = { AllValidations.class, UpdateValidations.class })
    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name != null) {
            this.name = name.trim();
        }

    }

    // Lastname
    @Size(min = 1, max = 60, groups = { AllValidations.class, UpdateValidations.class })
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        if (lastname != null) {
            this.lastname = lastname.trim();
        }

    }

    // Phone
    @Size(min = 1, max = 15, groups = { AllValidations.class, UpdateValidations.class })
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        if (phone != null) {
            this.phone = phone.trim();
        }
    }

    // Birthdate
    @NotNull(groups = { AllValidations.class, UpdateValidations.class })
    @Size(min = 1, max = 100, groups = { AllValidations.class, UpdateValidations.class })
    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        if (birthdate != null) {
            this.birthdate = birthdate.trim();
        }
    }

    // Country
    @Size(min = 1, max = 80, groups = { AllValidations.class, UpdateValidations.class })
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        if (country != null) {
            this.country = country.trim();
        }

    }

    // Gender
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    // Address
    @Size(min = 1, max = 300, groups = { AllValidations.class, UpdateValidations.class })
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        if (address != null) {
            this.address = address.trim();
        }
    }

    // Passport
    @Size(min = 1, max = 15, groups = { AllValidations.class, UpdateValidations.class })
    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        if (passport != null) {
            this.passport = passport.trim();
        }
    }

}
