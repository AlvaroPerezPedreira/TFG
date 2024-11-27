package com.tfg.TFG.model.services;

import com.tfg.TFG.model.entities.User;
import org.springframework.data.domain.Page;
import com.tfg.TFG.model.services.exceptions.BannedUserException;
import com.tfg.TFG.model.services.exceptions.IncorrectLoginException;
import com.tfg.TFG.model.services.exceptions.IncorrectPasswordException;
import com.tfg.TFG.model.services.exceptions.InvalidBirthdateException;
import com.tfg.TFG.model.services.exceptions.InvalidEmailException;
import com.tfg.TFG.model.services.exceptions.PermissionException;
import com.tfg.TFG.model.common.exceptions.*;

public interface UserService {
        void signUp(User user) throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException;

        User login(String email, String password) throws IncorrectLoginException, BannedUserException;

        User loginFromId(Long id) throws InstanceNotFoundException;

        User updateProfile(Long id, String userName, String name, String lastName, String phone, String birthDateString,
                        String country, String gender, String address, String passport)
                        throws InstanceNotFoundException, InvalidBirthdateException;

        void changePassword(Long id, String oldPassword, String newPassword)
                        throws InstanceNotFoundException, IncorrectPasswordException;

        User findById(Long id) throws InstanceNotFoundException;

        User findByEmail(String email) throws InstanceNotFoundException;

        void banUser(User admin, String bannedUserEmail) throws InstanceNotFoundException, PermissionException;

        void unbanUser(User admin, String bannedUserEmail) throws InstanceNotFoundException, PermissionException;

        Page<User> findAllBannedUsers(User admin, int page, int size) throws PermissionException;
}
