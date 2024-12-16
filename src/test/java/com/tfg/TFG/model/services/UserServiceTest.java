package com.tfg.TFG.model.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.tfg.TFG.model.services.exceptions.BannedUserException;
import com.tfg.TFG.model.services.exceptions.IncorrectLoginException;
import com.tfg.TFG.model.services.exceptions.IncorrectPasswordException;
import com.tfg.TFG.model.services.exceptions.InvalidBirthdateException;
import com.tfg.TFG.model.services.exceptions.InvalidEmailException;
import com.tfg.TFG.model.services.exceptions.PermissionException;
import com.tfg.TFG.model.common.exceptions.DuplicateInstanceException;
import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.User;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;

import org.junit.Test;
import org.junit.runner.RunWith;
import jakarta.transaction.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class UserServiceTest {
        @Autowired
        private UserService userService;

        private User createUser5Args(String userName) {
                return new User(userName + "@" + userName + ".com", "password", "username", "01-01-2000", "male");
        }

        @Test
        public void testSignUpAndLoginFromId()
                        throws DuplicateInstanceException, InstanceNotFoundException, InvalidEmailException,
                        InvalidBirthdateException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                User loggedUser = userService.loginFromId(user.getId());
                assertEquals(user, loggedUser);
                assertEquals(User.RoleType.USER, loggedUser.getRole());
        }

        @Test
        public void testUserAlreadyExists()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException {
                User user = createUser5Args("user2");
                userService.signUp(user);

                assertThrows(DuplicateInstanceException.class,
                                () -> userService.signUp(user));
        }

        @Test
        public void testIncorrectLoginUser()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        BannedUserException {
                User user = createUser5Args("user3");
                userService.signUp(user);

                assertThrows(IncorrectLoginException.class,
                                () -> userService.login("UserError", "password"));
        }

        @Test
        public void testIncorrectPassword()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        BannedUserException {
                User user = createUser5Args("user4");
                userService.signUp(user);

                assertThrows(IncorrectLoginException.class,
                                () -> userService.login(user.getEmail(), "passwordError"));
        }

        @Test
        public void testIncorrectOldPassword()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException {
                User user = createUser5Args("user5");
                userService.signUp(user);

                assertThrows(IncorrectPasswordException.class,
                                () -> userService.changePassword(user.getId(), "passwordError", "newPassword"));
        }

        @Test
        public void testUpdateProfile()
                        throws DuplicateInstanceException, InstanceNotFoundException, InvalidEmailException,
                        InvalidBirthdateException {
                User user = createUser5Args("user6");
                userService.signUp(user);

                User updatedUser = userService.updateProfile(user.getId(), "newUserName", "newName", "newLastName",
                                "newPhone",
                                "01-01-1999", "newCountry", "female", "newAddress", "newPassport");

                assertEquals("newUserName", updatedUser.getUsername());
                assertEquals("newName", updatedUser.getName());
                assertEquals("newLastName", updatedUser.getLastname());
                assertEquals("newPhone", updatedUser.getPhone());
                assertEquals("01-01-1999", updatedUser.getBirthdate());
                assertEquals("newCountry", updatedUser.getCountry());
                assertEquals("female", updatedUser.getGender());
                assertEquals("newAddress", updatedUser.getAddress());
                assertEquals("newPassport", updatedUser.getPassport());
        }

        @Test
        public void testFindById() throws DuplicateInstanceException, InstanceNotFoundException, InvalidEmailException,
                        InvalidBirthdateException {
                User user = createUser5Args("user7");
                userService.signUp(user);

                User foundUser = userService.findById(user.getId());
                assertEquals(user, foundUser);
        }

        @Test
        public void testFindByEmail()
                        throws DuplicateInstanceException, InstanceNotFoundException, InvalidEmailException,
                        InvalidBirthdateException {
                User user = createUser5Args("user8");
                userService.signUp(user);

                User foundUser = userService.findByEmail(user.getEmail());
                assertEquals(user, foundUser);
        }

        @Test
        public void testBannedUser() throws DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, BannedUserException, InstanceNotFoundException, PermissionException {
                User user = createUser5Args("user9");
                userService.signUp(user);
                User admin = userService.findByEmail("admin@udc.es");

                userService.banUser(admin, user.getEmail());

                assertThrows(BannedUserException.class,
                                () -> userService.login(user.getEmail(), "password"));
        }

        @Test
        public void testInvalidEmail() throws DuplicateInstanceException, InvalidEmailException {

                assertThrows(InvalidEmailException.class,
                                () -> userService.signUp(new User("invalidEmail", "password", "username", "01-01-2000",
                                                "female")));
        }

        @Test
        public void testInvalidBirthdate()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException {

                assertThrows(InvalidBirthdateException.class,
                                () -> userService.signUp(
                                                new User("a@udc.es", "password", "username", "01-01-2022", "male")));
        }
}
