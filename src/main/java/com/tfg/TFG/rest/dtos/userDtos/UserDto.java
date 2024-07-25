package com.tfg.TFG.rest.dtos.userDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * The Class UserDto.
 */
public class UserDto {

	/** The id. */
	private Long id;

	/** The user email. */
	private String email;

	/** The password. */
	private String password;

	/** The role. */
	private String role;

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

	/** The user avatar. */
	private String avatar;

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
	public UserDto() {
	}

	public UserDto(String email, String password, String role, String username, String name, String lastname,
			String phone, String birthdate, String country, String gender, String address, String passport) {
		this.email = email;
		this.password = password;
		this.role = role;
		this.username = username;
		this.name = name;
		this.lastname = lastname;
		this.phone = phone;
		this.birthdate = birthdate;
		this.country = country;
		this.gender = gender;
		this.address = address;
		this.passport = passport;
		this.avatar = null;
	}

	public UserDto(String email, String password, String role, String username, String name, String lastname,
			String phone, String birthdate, String country, String gender, String address, String passport,
			String avatar) {
		this.email = email;
		this.password = password;
		this.role = role;
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	// Email
	@NotNull(groups = { AllValidations.class, UpdateValidations.class })
	@Size(min = 1, max = 60, groups = { AllValidations.class, UpdateValidations.class })
	@Email(groups = { AllValidations.class, UpdateValidations.class })
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		if (email != null) {
			this.email = email.trim();
		}
	}

	// Password
	@NotNull(groups = { AllValidations.class })
	@Size(min = 1, max = 60, groups = { AllValidations.class })
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	// Role
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
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

	// Avatar
	@Size(min = 1, max = 350, groups = { AllValidations.class, UpdateValidations.class })
	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		if (avatar != null) {
			this.avatar = avatar.trim();
		}
	}

}
