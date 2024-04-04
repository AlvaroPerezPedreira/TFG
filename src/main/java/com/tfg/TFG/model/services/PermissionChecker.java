package com.tfg.TFG.model.services;

import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.User;

/**
 * The Interface PermissionChecker.
 */
public interface PermissionChecker {

	/**
	 * Check user exists.
	 *
	 * @param userId the user id
	 * @throws InstanceNotFoundException the instance not found exception
	 */
	public void checkUserExists(Long userId) throws InstanceNotFoundException;

	/**
	 * Check user.
	 *
	 * @param userId the user id
	 * @return the user
	 * @throws InstanceNotFoundException the instance not found exception
	 */
	public User checkUser(Long userId) throws InstanceNotFoundException;

}
