package com.tfg.TFG.rest.dtos.userDtos;

import com.tfg.TFG.model.entities.User;

/**
 * The Class UserConversor.
 */
public class UserConversor {

	/**
	 * Instantiates a new user conversor.
	 */
	private UserConversor() {
	}

	/**
	 * To user dto.
	 *
	 * @param user the user
	 * @return the user dto
	 */
	public static final UserDto toUserDto(User user) {
		return new UserDto(user.getEmail(), user.getPassword(), user.getRole().toString(), user.getUsername(),
				user.getName(),
				user.getLastname(),
				user.getPhone(), user.getBirthdate(), user.getCountry(), user.getGender(), user.getAddress(),
				user.getPassport(), user.getAvatar());
	}

	/**
	 * To user.
	 *
	 * @param userDto the user dto
	 * @return the user
	 */
	public static final User toUser(UserDto userDto) {
		return new User(userDto.getEmail(), userDto.getPassword(), userDto.getUsername(), userDto.getName(),
				userDto.getLastname(), userDto.getPhone(), userDto.getBirthdate(),
				userDto.getCountry(), userDto.getGender(), userDto.getAddress(), userDto.getPassport(),
				userDto.getAvatar());
	}

	/**
	 * To authenticated user dto.
	 *
	 * @param serviceToken the service token
	 * @param user         the user
	 * @return the authenticated user dto
	 */
	public static final AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {

		return new AuthenticatedUserDto(serviceToken, toUserDto(user));

	}

}
