package com.tfg.TFG.model.services.exceptions;

/**
 * The Class BannedUserException.
 */
@SuppressWarnings("serial")
public class BannedUserException extends Exception {
    /** The user email */
    private final String email;

    public BannedUserException(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }
}