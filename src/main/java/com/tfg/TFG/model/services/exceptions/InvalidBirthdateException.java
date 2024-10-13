package com.tfg.TFG.model.services.exceptions;

/**
 * The Class InvalidBirthdateException.
 */
@SuppressWarnings("serial")
public class InvalidBirthdateException extends Exception {
    private final String birthdate;

    /**
     * Instantiates a new invalid birthdate exception.
     *
     * @param birthdate the birthdate
     */
    public InvalidBirthdateException(String birthdate) {
        this.birthdate = birthdate;
    }

    /**
     * Gets the birthdate.
     *
     * @return the birthdate
     */
    public String getBirthdate() {
        return birthdate;
    }
}
