package com.tfg.TFG.rest.controllers;

import static com.tfg.TFG.rest.dtos.userDtos.UserConversor.*;

import java.net.URI;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.tfg.TFG.model.common.exceptions.*;
import com.tfg.TFG.model.entities.*;
import com.tfg.TFG.model.services.UserService;
import com.tfg.TFG.model.services.exceptions.*;
import com.tfg.TFG.rest.common.ErrorsDto;
import com.tfg.TFG.rest.common.JwtGenerator;
import com.tfg.TFG.rest.common.JwtInfo;
import com.tfg.TFG.rest.dtos.userDtos.AuthenticatedUserDto;
import com.tfg.TFG.rest.dtos.userDtos.ChangePasswordParamsDto;
import com.tfg.TFG.rest.dtos.userDtos.LoginParamsDto;
import com.tfg.TFG.rest.dtos.userDtos.UserDto;
import com.tfg.TFG.rest.dtos.userDtos.UpdatedUserDto;

/**
 * The Class UserController.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

	/** The Constant INCORRECT_LOGIN_EXCEPTION_CODE. */
	private static final String INCORRECT_LOGIN_EXCEPTION_CODE = "project.exceptions.IncorrectLoginException";

	/** The Constant INCORRECT_PASSWORD_EXCEPTION_CODE. */
	private static final String INCORRECT_PASS_EXCEPTION_CODE = "project.exceptions.IncorrectPasswordException";

	/** The Constant INVALID_EMAIL_EXCEPTION_CODE. */
	private static final String INVALID_EMAIL_EXCEPTION_CODE = "project.exceptions.InvalidEmailException";

	/** The Constant INVALID_BIRTHDATE_EXCEPTION_CODE. */
	private static final String INVALID_BIRTHDATE_EXCEPTION_CODE = "project.exceptions.InvalidBirthdateException";

	/** The Constant INVALID_BIRTHDATE_EXCEPTION_CODE. */
	private static final String PERMISSION_EXCEPTION_CODE = "project.exceptions.PermissionException";

	/** The Constant INVALID_BIRTHDATE_EXCEPTION_CODE. */
	private static final String BANNED_EXCEPTION_CODE = "project.exceptions.BannedUserException";

	/** The message source. */
	@Autowired
	private MessageSource messageSource;

	/** The jwt generator. */
	@Autowired
	private JwtGenerator jwtGenerator;

	/** The user service. */
	@Autowired
	private UserService userService;

	@ExceptionHandler(IncorrectLoginException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ResponseBody
	public ErrorsDto handleIncorrectLoginException(IncorrectLoginException exception, Locale locale) {

		String errorMessage = messageSource.getMessage(INCORRECT_LOGIN_EXCEPTION_CODE, null,
				INCORRECT_LOGIN_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);

	}

	@ExceptionHandler(IncorrectPasswordException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ResponseBody
	public ErrorsDto handleIncorrectPasswordException(IncorrectPasswordException exception, Locale locale) {

		String errorMessage = messageSource.getMessage(INCORRECT_PASS_EXCEPTION_CODE, null,
				INCORRECT_PASS_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);

	}

	@ExceptionHandler(InvalidEmailException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleInvalidEmailException(InvalidEmailException exception, Locale locale) {

		String errorMessage = messageSource.getMessage(INVALID_EMAIL_EXCEPTION_CODE, null,
				INVALID_EMAIL_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);

	}

	@ExceptionHandler(InvalidBirthdateException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleInvalidBirthdateException(InvalidBirthdateException exception, Locale locale) {

		String errorMessage = messageSource.getMessage(INVALID_BIRTHDATE_EXCEPTION_CODE, null,
				INVALID_BIRTHDATE_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}

	@ExceptionHandler(PermissionException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	public ErrorsDto handleInvalidBirthdateException(PermissionException exception, Locale locale) {

		String errorMessage = messageSource.getMessage(PERMISSION_EXCEPTION_CODE, null,
				PERMISSION_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}

	@ExceptionHandler(BannedUserException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	public ErrorsDto handleBannedUserException(BannedUserException exception, Locale locale) {

		String errorMessage = messageSource.getMessage(BANNED_EXCEPTION_CODE, null,
				BANNED_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}

	/*
	 * @GetMapping("/{id}")
	 * public ResponseEntity<UserDto> getUser(@RequestAttribute Long
	 * userId, @PathVariable Long id)
	 * throws InstanceNotFoundException, PermissionException {
	 * 
	 * System.out.println("getUser");
	 * 
	 * if (!id.equals(userId)) {
	 * throw new PermissionException();
	 * }
	 * 
	 * User user = userService.findById(id);
	 * 
	 * return ResponseEntity.ok(toUserDto(user));
	 * 
	 * }
	 */

	@GetMapping("/{email}")
	public ResponseEntity<UserDto> getUserByEmail(@RequestAttribute Long userId, @PathVariable String email)
			throws InstanceNotFoundException, PermissionException {

		System.out.println("getUserByEmail");

		User user = userService.findByEmail(email);

		return ResponseEntity.ok(toUserDto(user));
	}

	@PostMapping("/signUp")
	public ResponseEntity<AuthenticatedUserDto> signUp(
			@Validated({ UserDto.AllValidations.class }) @RequestBody UserDto userDto)
			throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException {
		System.out.println("signUp");
		User user = toUser(userDto);

		userService.signUp(user);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId())
				.toUri();

		return ResponseEntity.created(location).body(toAuthenticatedUserDto(generateServiceToken(user), user));

	}

	/**
	 * Login.
	 *
	 * @param params the params
	 * @return the authenticated user dto
	 * @throws IncorrectLoginException the incorrect login exception
	 */
	@PostMapping("/login")
	public AuthenticatedUserDto login(@Validated @RequestBody LoginParamsDto params)
			throws IncorrectLoginException, BannedUserException {

		System.out.println("login");

		User user = userService.login(params.getEmail(), params.getPassword());

		return toAuthenticatedUserDto(generateServiceToken(user), user);

	}

	/**
	 * Login from service token.
	 *
	 * @param userId       the user id
	 * @param serviceToken the service token
	 * @return the authenticated user dto
	 * @throws InstanceNotFoundException the instance not found exception
	 */
	@PostMapping("/loginFromServiceToken")
	public AuthenticatedUserDto loginFromServiceToken(@RequestAttribute Long userId,
			@RequestAttribute String serviceToken) throws InstanceNotFoundException {

		User user = userService.loginFromId(userId);

		return toAuthenticatedUserDto(serviceToken, user);

	}

	/**
	 * Update profile.
	 *
	 * @param userId  the user id
	 * @param id      the id
	 * @param userDto the user dto
	 * @return the user dto
	 * @throws InstanceNotFoundException the instance not found exception
	 * @throws PermissionException       the permission exception
	 */
	@PutMapping("/updateUser")
	public UserDto updateProfile(@RequestAttribute Long userId,
			@Validated({ UserDto.UpdateValidations.class }) @RequestBody UpdatedUserDto updatedUserDto)
			throws InstanceNotFoundException, InvalidBirthdateException, PermissionException {

		System.out.println("update profile");

		return toUserDto(
				userService.updateProfile(userId, updatedUserDto.getUsername(), updatedUserDto.getName(),
						updatedUserDto.getLastname(),
						updatedUserDto.getPhone(), updatedUserDto.getBirthdate(), updatedUserDto.getCountry(),
						updatedUserDto.getGender(),
						updatedUserDto.getAddress(), updatedUserDto.getPassport()));

	}

	/**
	 * Change password.
	 *
	 * @param userId the user id
	 * @param id     the id
	 * @param params the params
	 * @throws PermissionException        the permission exception
	 * @throws InstanceNotFoundException  the instance not found exception
	 * @throws IncorrectPasswordException the incorrect password exception
	 */
	@PostMapping("/changePassword")
	@ResponseStatus(HttpStatus.OK)
	public void changePassword(@RequestAttribute Long userId,
			@Validated @RequestBody ChangePasswordParamsDto params)
			throws PermissionException, InstanceNotFoundException, IncorrectPasswordException {

		System.out.println("change password");

		userService.changePassword(userId, params.getOldPassword(), params.getNewPassword());

	}

	@PostMapping("/banUser/{email}")
	@ResponseStatus(HttpStatus.OK)
	public void banUser(@RequestAttribute Long userId, @PathVariable String email)
			throws InstanceNotFoundException, PermissionException {

		System.out.println("ban user");

		User admin = userService.findById(userId);

		userService.banUser(admin, email);
	}

	@PostMapping("/unbanUser/{email}")
	@ResponseStatus(HttpStatus.OK)
	public void unbanUser(@RequestAttribute Long userId, @PathVariable String email)
			throws InstanceNotFoundException, PermissionException {

		System.out.println("unban user");

		User admin = userService.findById(userId);

		userService.unbanUser(admin, email);
	}

	/**
	 * Generate service token.
	 *
	 * @param user the user
	 * @return the string
	 */
	private String generateServiceToken(User user) {

		JwtInfo jwtInfo = new JwtInfo(user.getId(), user.getUsername(), user.getRole().toString());

		return jwtGenerator.generate(jwtInfo);

	}

}
