package com.tfg.TFG.model.services.exceptions;

/**
 * The Class InvalidEmailException.
 */

@SuppressWarnings("serial")
public class InvalidEmailException extends Exception {
    private final String email;

    /**
     * Instantiates a new invalid email exception.
     *
     * @param email the email
     */
    public InvalidEmailException(String email) {
        this.email = email;
    }

    /**
     * Gets the user name.
     *
     * @return the user name
     */
    public String getEmail() {
        return email;
    }
}