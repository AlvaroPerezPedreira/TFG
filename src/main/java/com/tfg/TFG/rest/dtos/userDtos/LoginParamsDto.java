package com.tfg.TFG.rest.dtos.userDtos;

import jakarta.validation.constraints.NotNull;

/**
 * The Class LoginParamsDto.
 */
public class LoginParamsDto {

	/** The user email. */
	private String email;

	/** The password. */
	private String password;

	/**
	 * Instantiates a new login params dto.
	 */
	public LoginParamsDto() {
		super();
	}

	// Email
	@NotNull
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email.trim();
	}

	// Password
	@NotNull
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
