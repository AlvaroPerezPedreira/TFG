package com.tfg.TFG.model.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.tfg.TFG.model.services.exceptions.CancelBookingException;
import com.tfg.TFG.model.services.exceptions.InvalidBirthdateException;
import com.tfg.TFG.model.services.exceptions.InvalidEmailException;
import com.tfg.TFG.model.services.exceptions.PermissionException;
import com.tfg.TFG.model.common.exceptions.DuplicateInstanceException;
import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Booking;
import com.tfg.TFG.model.entities.Lodge;
import com.tfg.TFG.model.entities.Review;
import com.tfg.TFG.model.entities.BookingDao;
import com.tfg.TFG.model.entities.ReviewDao;
import com.tfg.TFG.model.entities.User;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import jakarta.transaction.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class BookingServiceTest {

        @Autowired
        private BookingDao bookingDao;

        @Autowired
        private ReviewDao reviewDao;

        @Autowired
        private UserService userService;

        @Autowired
        private LodgeService lodgeService;

        @Autowired
        private BookingService bookingService;

        private User createUser5Args(String userName) {
                return new User(userName + "@" + userName + ".com", "password", "username", "01-01-2000", "male");
        }

        private Lodge createLodge(Long userId, String lodgeName)
                        throws DuplicateInstanceException, InstanceNotFoundException, PermissionException {
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));

                return lodgeService.createLodge(userId, lodgeName + "@" + "udc.es", lodgeName, "description",
                                lodgeName + "address", "123321123", "city", "country", 4, 50, "12:00", "10:00",
                                featureIds, imageUrls);
        }

        @Test
        public void testCreateBooking()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-01-2022", "02-01-2022", 100, false);
                Booking bookingAux = bookingDao.findById(booking.getId()).get();
                assertEquals(booking, bookingAux);
        }

        @Test
        public void testCreateBookingCheckParams()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-01-2022", "02-01-2022", 100, false);
                Booking bookingAux = bookingDao.findById(booking.getId()).get();

                assertEquals(booking.getUser(), bookingAux.getUser());
                assertEquals(booking.getLodge(), bookingAux.getLodge());
                assertEquals(booking.getCheck_in(), bookingAux.getCheck_in());
                assertEquals(booking.getCheck_out(), bookingAux.getCheck_out());
                assertEquals(booking.getArrival_time(), bookingAux.getArrival_time());
                assertEquals(booking.getDeparture_time(), bookingAux.getDeparture_time());
                assertEquals(booking.getBooking_date(), bookingAux.getBooking_date());
                assertEquals(booking.getTotal_price(), bookingAux.getTotal_price(), 0.001);
                assertEquals(booking.getLodge_email(), bookingAux.getLodge_email());
                assertEquals(booking.getIs_reviewed(), bookingAux.getIs_reviewed());
                assertEquals(booking.getIs_cancelled(), bookingAux.getIs_cancelled());
                assertEquals(booking.getIs_api(), bookingAux.getIs_api());
        }

        @Test
        public void testGetBookingsByUser()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking1 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-01-2022", "02-01-2022", 100, false);
                Booking booking2 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-01-2022", "02-01-2022", 100, false);
                Booking booking3 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-01-2022", "02-01-2022", 100, false);

                List<Booking> bookings = bookingService.getBookingsByUserId(user.getId());
                List<Booking> bookingsAux = new ArrayList<>(Arrays.asList(booking1, booking2, booking3));

                assertEquals(bookings, bookingsAux);
                assertEquals(bookings.size(), 3);
        }

        @Test
        public void testCheckAvailability1()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking1 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2025", "07-03-2025", 100, false);
                Booking booking2 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2025", "07-03-2025", 100, false);
                Booking booking3 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2025", "07-03-2025", 100, false);

                assertEquals(true,
                                bookingService.checkAvailability(lodge.getLodge_email(), "01-03-2025", "03-03-2025"));
        }

        @Test
        public void testCheckAvailability2()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking1 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2025", "07-03-2025", 100, false);
                Booking booking2 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2025", "07-03-2025", 100, false);
                Booking booking3 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2025", "07-03-2025", 100, false);
                Booking booking4 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2025", "07-03-2025", 100, false);

                assertEquals(false,
                                bookingService.checkAvailability(lodge.getLodge_email(), "01-03-2025", "03-03-2025"));
        }

        @Test
        public void testCancelBooking1()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException, CancelBookingException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2025", "07-03-2025", 100, false);
                bookingService.cancelBooking(user.getId(), booking.getId());

                assertEquals(booking.getIs_cancelled(), true);
        }

        @Test
        public void testCancelBooking2()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException, CancelBookingException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);

                assertThrows(CancelBookingException.class, () -> {
                        bookingService.cancelBooking(user.getId(), booking.getId());
                });
        }

        @Test
        public void testReviewBooking()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException, CancelBookingException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);
                Review review = bookingService.createReview(user.getId(), booking.getId(), lodge.getLodge_email(),
                                "review",
                                5);
                Review reviewAux = reviewDao.findById(review.getId()).get();

                assertEquals(review, reviewAux);
        }

        @Test
        public void testReviewBookingCheckParams()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException, CancelBookingException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);
                Review review = bookingService.createReview(user.getId(), booking.getId(), lodge.getLodge_email(),
                                "review",
                                5);
                Review reviewAux = reviewDao.findById(review.getId()).get();

                assertEquals(review.getUser(), reviewAux.getUser());
                assertEquals(review.getBooking(), reviewAux.getBooking());
                assertEquals(review.getReview_lodgeEmail(), reviewAux.getReview_lodgeEmail());
                assertEquals(review.getReview_date(), reviewAux.getReview_date());
                assertEquals(review.getReview_text(), reviewAux.getReview_text());
                assertEquals(review.getRating(), reviewAux.getRating());
                assertEquals(review.getIs_blocked(), reviewAux.getIs_blocked());
        }

        @Test
        public void testGetReviewByEmail()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException, CancelBookingException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking1 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);
                Booking booking2 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);
                Booking booking3 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);
                Review review1 = bookingService.createReview(user.getId(), booking1.getId(), lodge.getLodge_email(),
                                "review",
                                5);
                Review review2 = bookingService.createReview(user.getId(), booking2.getId(), lodge.getLodge_email(),
                                "review",
                                5);
                Review review3 = bookingService.createReview(user.getId(), booking3.getId(), lodge.getLodge_email(),
                                "review",
                                5);

                List<Review> reviews = bookingService.getReviewsByLodgeEmail(lodge.getLodge_email());
                List<Review> reviewsAux = new ArrayList<>(Arrays.asList(review1, review2, review3));

                assertEquals(reviews, reviewsAux);
                assertEquals(reviews.size(), 3);
        }

        @Test
        public void testHasReviews1()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException, CancelBookingException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking1 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);
                Booking booking2 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);
                Review review1 = bookingService.createReview(user.getId(), booking1.getId(), lodge.getLodge_email(),
                                "review",
                                5);
                Review review2 = bookingService.createReview(user.getId(), booking2.getId(), lodge.getLodge_email(),
                                "review",
                                5);

                assertEquals(true, bookingService.hasReviews(lodge.getLodge_email()));
        }

        @Test
        public void testHasReviews2()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException, CancelBookingException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking1 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);
                Booking booking2 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);

                assertEquals(false, bookingService.hasReviews(lodge.getLodge_email()));
        }

        @Test
        public void testBanReview1()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException, CancelBookingException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking1 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);
                Review review = bookingService.createReview(user.getId(), booking1.getId(), lodge.getLodge_email(),
                                "review",
                                5);

                assertThrows(PermissionException.class, () -> {
                        bookingService.banReview(user, review.getId());
                });
        }

        @Test
        public void testBanReview2()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException, CancelBookingException {
                User user = createUser5Args("user");
                userService.signUp(user);
                user.setRole(User.RoleType.ADMIN);
                Lodge lodge = createLodge(user.getId(), "lodgeName1");
                Booking booking1 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);
                Review review = bookingService.createReview(user.getId(), booking1.getId(), lodge.getLodge_email(),
                                "review",
                                5);

                bookingService.banReview(user, review.getId());

                assertEquals(review.getIs_blocked(), true);
        }

        @Test
        public void testCreateBooking2()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName100");
                Booking booking = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-01-2022", "02-01-2022", 100, true);
                Booking bookingAux = bookingDao.findById(booking.getId()).get();
                assertEquals(booking, bookingAux);
        }

        @Test
        public void testCheckAvailability3()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName23");
                Booking booking1 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2025", "07-03-2025", 100, false);

                assertEquals(false,
                                bookingService.checkAvailability(lodge.getLodge_email(), "01-03-2023", "03-03-2023"));
        }

        @Test
        public void testCancelBooking3()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException, CancelBookingException {
                User user = createUser5Args("user");
                userService.signUp(user);
                User user1 = createUser5Args("user123");
                userService.signUp(user1);
                Lodge lodge = createLodge(user.getId(), "lodgeName57");
                Booking booking = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);

                assertThrows(PermissionException.class, () -> {
                        bookingService.cancelBooking(user1.getId(), booking.getId());
                });
        }

        @Test
        public void testReviewBooking2()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException, CancelBookingException {
                User user = createUser5Args("user");
                userService.signUp(user);
                User user1 = createUser5Args("user123");
                userService.signUp(user1);
                Lodge lodge = createLodge(user.getId(), "lodgeName48");
                Booking booking = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-03-2024", "07-03-2024", 100, false);

                assertThrows(PermissionException.class, () -> {
                        bookingService.createReview(user1.getId(), booking.getId(), lodge.getLodge_email(),
                                        "review",
                                        5);
                });
        }

        @Test
        public void testGetBookingsById()
                        throws DuplicateInstanceException, InvalidEmailException, InvalidBirthdateException,
                        InstanceNotFoundException, PermissionException {
                User user = createUser5Args("user");
                userService.signUp(user);
                Lodge lodge = createLodge(user.getId(), "lodgeName3");
                Booking booking1 = bookingService.createBooking(user.getId(), lodge.getLodge_email(), "12:00", "10:00",
                                "01-01-2022", "02-01-2022", 100, false);

                List<Booking> bookings = bookingService.getBookingsByUserId(user.getId());
                Booking booking2 = bookingService.getBookingById(bookings.get(0).getId());

                assertEquals(bookings.get(0), booking2);
        }
}
