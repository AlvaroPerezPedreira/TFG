package com.tfg.TFG.model.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tfg.TFG.model.common.exceptions.DuplicateInstanceException;
import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.User;
import com.tfg.TFG.model.entities.UserDao;
import com.tfg.TFG.model.services.exceptions.*;

/**
 * The Class UserServiceImpl.
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {

    /** The permission checker. */
    @Autowired
    private PermissionChecker permissionChecker;

    /** The password encoder. */
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /** The user dao. */
    @Autowired
    private UserDao userDao;

    @Override
    public void signUp(User user) throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException {

        if (userDao.existsByEmail(user.getEmail())) {
            throw new DuplicateInstanceException("project.entities.user", user.getEmail());
        }

        if (!user.getEmail().matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")) {
            throw new InvalidEmailException(user.getEmail());
        }

        String birthdate = user.getBirthdate();
        String[] birthdateParts = birthdate.split("-");
        int year = Integer.parseInt(birthdateParts[2]);

        if (year < 1900 || year >= 2014) {
            throw new InvalidBirthdateException(user.getBirthdate());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(User.RoleType.USER);
        user.setAvatar("Default_Avatar.png");

        userDao.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User login(String email, String password) throws IncorrectLoginException {

        Optional<User> user = userDao.findByEmail(email);

        if (!user.isPresent()) {
            throw new IncorrectLoginException(email, password);
        }

        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            throw new IncorrectLoginException(email, password);
        }

        return user.get();

    }

    @Override
    @Transactional(readOnly = true)
    public User loginFromId(Long id) throws InstanceNotFoundException {
        return permissionChecker.checkUser(id);
    }

    @Override
    public User updateProfile(Long id, String userName, String name, String lastName, String phone,
            String birthdate, String country, String gender, String address, String passport)
            throws InstanceNotFoundException, InvalidBirthdateException {

        User user = permissionChecker.checkUser(id);

        String[] birthdateParts = birthdate.split("-");
        int year = Integer.parseInt(birthdateParts[2]);
        if (year < 1900 || year >= 2014) {
            throw new InvalidBirthdateException(user.getBirthdate());
        }

        user.setUsername(userName);
        user.setName(name);
        user.setLastname(lastName);
        user.setPhone(phone);
        user.setBirthdate(birthdate);
        user.setCountry(country);
        user.setGender(gender);
        user.setAddress(address);
        user.setPassport(passport);

        return user;
    }

    @Override
    public void changePassword(Long id, String oldPassword, String newPassword)
            throws InstanceNotFoundException, IncorrectPasswordException {

        User user = permissionChecker.checkUser(id);

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new IncorrectPasswordException();
        } else {
            user.setPassword(passwordEncoder.encode(newPassword));
        }

    }

    @Override
    public User findById(Long id) throws InstanceNotFoundException {
        return userDao.findById(id).orElseThrow(() -> new InstanceNotFoundException("project.entities.user", id));
    }

    @Override
    public User findByEmail(String email) throws InstanceNotFoundException {
        return userDao.findByEmail(email)
                .orElseThrow(() -> new InstanceNotFoundException("project.entities.user", email));
    }
}
