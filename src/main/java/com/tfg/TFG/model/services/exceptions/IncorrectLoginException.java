package com.tfg.TFG.model.services.exceptions;

/**
 * The Class IncorrectLoginException.
 */
@SuppressWarnings("serial")
public class IncorrectLoginException extends Exception {

	/** The user name. */
	private final String email;

	/** The password. */
	private final String password;

	/**
	 * Instantiates a new incorrect login exception.
	 *
	 * @param userName the user name
	 * @param password the password
	 */
	public IncorrectLoginException(String email, String password) {

		this.email = email;
		this.password = password;

	}

	/**
	 * Gets the user name.
	 *
	 * @return the user name
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Gets the password.
	 *
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

}
