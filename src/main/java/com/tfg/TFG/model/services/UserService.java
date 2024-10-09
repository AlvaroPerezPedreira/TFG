package com.tfg.TFG.model.services;

import com.tfg.TFG.model.entities.User;
import com.tfg.TFG.model.services.exceptions.IncorrectLoginException;
import com.tfg.TFG.model.services.exceptions.IncorrectPasswordException;
import com.tfg.TFG.model.common.exceptions.*;

public interface UserService {
        void signUp(User user) throws DuplicateInstanceException;

        User login(String email, String password) throws IncorrectLoginException;

        User loginFromId(Long id) throws InstanceNotFoundException;

        User updateProfile(Long id, String userName, String name, String lastName, String phone, String birthDateString,
                        String country, String gender, String address, String passport)
                        throws InstanceNotFoundException;

        void changePassword(Long id, String oldPassword, String newPassword)
                        throws InstanceNotFoundException, IncorrectPasswordException;

        User findById(Long id) throws InstanceNotFoundException;

}
