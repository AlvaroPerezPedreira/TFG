package com.tfg.TFG.model.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.data.domain.Page;

import com.tfg.TFG.model.entities.User.RoleType;

import com.tfg.TFG.model.services.exceptions.InvalidBirthdateException;
import com.tfg.TFG.model.services.exceptions.InvalidEmailException;
import com.tfg.TFG.model.services.exceptions.PermissionException;
import com.tfg.TFG.model.common.exceptions.DuplicateInstanceException;
import com.tfg.TFG.model.common.exceptions.InstanceNotFoundException;
import com.tfg.TFG.model.entities.Lodge;
import com.tfg.TFG.model.entities.LodgeDao;
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
public class LodgeServiceTest {

        @Autowired
        private LodgeDao lodgeDao;

        @Autowired
        private UserService userService;

        @Autowired
        private LodgeService lodgeService;

        private User createUser5Args(String userName) {
                return new User(userName + "@" + userName + ".com", "password", "username", "01-01-2000", "male");
        }

        @Test
        public void testCreateLodge()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                assertEquals(lodge, lodgeDao.findByEmail("Lodge1@udc.es").get());
        }

        @Test
        public void testCreateLodgeAndGetFields()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                assertEquals(lodge, lodgeDao.findByEmail("Lodge1@udc.es").get());
                assertEquals("Lodge1@udc.es", lodge.getLodge_email());
                assertEquals("Lodge1", lodge.getLodge_name());
                assertEquals("Description", lodge.getLodge_description());
                assertEquals("Address", lodge.getLodge_address());
                assertEquals("981981981", lodge.getLodge_phone());
                assertEquals("City", lodge.getCity());
                assertEquals("Country", lodge.getCountry());
                assertEquals(5, lodge.getAvailable_rooms());
                assertEquals(50, lodge.getPrice_per_night(), 0.001);
                assertEquals("12:00", lodge.getCheck_in());
                assertEquals("10:00", lodge.getCheck_out());
        }

        @Test
        public void testFindByCity()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);
                Lodge lodge2 = lodgeService.createLodge(user.getId(), "Lodge2@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);
                Lodge lodge3 = lodgeService.createLodge(user.getId(), "Lodge3@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City2", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                assertEquals(2, lodgeService.getLodgesByCity("City", 0, 10).getTotalElements());
        }

        @Test
        public void testFindByCountry()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);
                Lodge lodge2 = lodgeService.createLodge(user.getId(), "Lodge2@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country2", 5, 50, "12:00", "10:00", featureIds, imageUrls);
                Lodge lodge3 = lodgeService.createLodge(user.getId(), "Lodge3@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City2", "Country2", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                assertEquals(2, lodgeService.getLodgesByCountry("Country2", 0, 10).getTotalElements());
        }

        @Test
        public void testFindByPlace()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City1", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);
                Lodge lodge2 = lodgeService.createLodge(user.getId(), "Lodge2@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City2", "Country2", 5, 50, "12:00", "10:00", featureIds, imageUrls);
                Lodge lodge3 = lodgeService.createLodge(user.getId(), "Lodge3@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City3", "Country2", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                assertEquals(2, lodgeService.getLodgesByPlace("Country2", 0, 10).getTotalElements());
        }

        @Test
        public void testFindByPlace2()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City1", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);
                Lodge lodge2 = lodgeService.createLodge(user.getId(), "Lodge2@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City2", "Country2", 5, 50, "12:00", "10:00", featureIds, imageUrls);
                Lodge lodge3 = lodgeService.createLodge(user.getId(), "Lodge3@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City2", "Country3", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                assertEquals(2, lodgeService.getLodgesByPlace("City2", 0, 10).getTotalElements());
        }

        @Test
        public void testGetAllFeatures() {
                assertEquals(63, lodgeService.getAllFeatures().size());
        }

        @Test
        public void testUpdateLodge()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                List<Long> featureIdsUpdated = new ArrayList<>(Arrays.asList(1L, 2L, 6L, 8L, 10L));

                lodgeService.updateLodge(user.getId(), "Lodge1@udc.es", "Lodge1Updated", "DescriptionUpdated",
                                "AddressUpdated",
                                "111222111", "CityUpdated", "CountryUpdated", 100, 1000, "00:00", "00:00",
                                featureIdsUpdated,
                                imageUrls);

                Lodge updatedLodge = lodgeDao.findByEmail("Lodge1@udc.es").get();

                assertEquals(updatedLodge, lodgeDao.findByEmail("Lodge1@udc.es").get());
                assertEquals("Lodge1@udc.es", updatedLodge.getLodge_email());
                assertEquals("Lodge1Updated", updatedLodge.getLodge_name());
                assertEquals("DescriptionUpdated", updatedLodge.getLodge_description());
                assertEquals("AddressUpdated", updatedLodge.getLodge_address());
                assertEquals("111222111", updatedLodge.getLodge_phone());
                assertEquals("CityUpdated", updatedLodge.getCity());
                assertEquals("CountryUpdated", updatedLodge.getCountry());
                assertEquals(100, updatedLodge.getAvailable_rooms());
                assertEquals(1000, updatedLodge.getPrice_per_night(), 0.001);
                assertEquals("00:00", updatedLodge.getCheck_in());
                assertEquals("00:00", updatedLodge.getCheck_out());
                assertEquals(5, updatedLodge.getFeatures().size());
        }

        @Test
        public void testUpdateLodge2()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                User user2 = createUser5Args("user2");
                userService.signUp(user2);

                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                assertThrows(PermissionException.class,
                                () -> lodgeService.updateLodge(user2.getId(), "Lodge1@udc.es", "Lodge1Updated",
                                                "DescriptionUpdated",
                                                "AddressUpdated",
                                                "111222111", "CityUpdated", "CountryUpdated", 100, 1000, "00:00",
                                                "00:00", featureIds,
                                                imageUrls));
        }

        @Test
        public void testCloseLodge()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                lodgeService.closeLodge(user, lodge);

                assertEquals(lodge.getIs_closed(), true);
        }

        @Test
        public void testCloseLodge2()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                User user2 = createUser5Args("user2");
                userService.signUp(user2);

                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                assertThrows(PermissionException.class,
                                () -> lodgeService.closeLodge(user2, lodge));
        }

        @Test
        public void testOpenLodge() throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                lodgeService.closeLodge(user, lodge);
                assertEquals(lodge.getIs_closed(), true);

                lodgeService.openLodge(user, lodge);

                assertEquals(lodge.getIs_closed(), false);
        }

        @Test
        public void testOpenLodge2()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                User user2 = createUser5Args("user2");
                userService.signUp(user2);

                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                lodgeService.closeLodge(user, lodge);
                assertEquals(lodge.getIs_closed(), true);

                assertThrows(PermissionException.class,
                                () -> lodgeService.openLodge(user2, lodge));
        }

        @Test
        public void testBanLodge() throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                User user2 = createUser5Args("user2");
                userService.signUp(user2);
                user2.setRole(RoleType.ADMIN);

                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                lodgeService.banLodge(user2, lodge.getLodge_email());
                assertEquals(lodge.getIs_banned(), true);
        }

        @Test
        public void testBanLodge2() throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                User user2 = createUser5Args("user2");
                userService.signUp(user2);

                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                assertThrows(PermissionException.class,
                                () -> lodgeService.banLodge(user2, lodge.getLodge_email()));
        }

        @Test
        public void testUnbanLodge()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                User user2 = createUser5Args("user2");
                userService.signUp(user2);
                user2.setRole(RoleType.ADMIN);

                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                lodgeService.banLodge(user2, lodge.getLodge_email());
                assertEquals(lodge.getIs_banned(), true);

                lodgeService.unbanLodge(user2, lodge.getLodge_email());
                assertEquals(lodge.getIs_banned(), false);
        }

        @Test
        public void testUnbanLodge2()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                User user2 = createUser5Args("user2");
                userService.signUp(user2);
                user2.setRole(RoleType.ADMIN);
                User user3 = createUser5Args("user3");
                userService.signUp(user3);

                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                lodgeService.banLodge(user2, lodge.getLodge_email());
                assertEquals(lodge.getIs_banned(), true);

                assertThrows(PermissionException.class,
                                () -> lodgeService.unbanLodge(user3, lodge.getLodge_email()));
        }

        @Test
        public void testFindAllBannedLodges()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {

                User user = createUser5Args("user1");
                userService.signUp(user);
                User user2 = createUser5Args("user2");
                userService.signUp(user2);
                user2.setRole(RoleType.ADMIN);

                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge1 = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);
                Lodge lodge2 = lodgeService.createLodge(user.getId(), "Lodge2@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);
                Lodge lodge3 = lodgeService.createLodge(user.getId(), "Lodge3@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                lodgeService.banLodge(user2, lodge1.getLodge_email());
                assertEquals(lodge1.getIs_banned(), true);
                lodgeService.banLodge(user2, lodge2.getLodge_email());
                assertEquals(lodge2.getIs_banned(), true);
                lodgeService.banLodge(user2, lodge3.getLodge_email());
                assertEquals(lodge3.getIs_banned(), true);

                // +1 por el que se crea en el script de datos
                assertEquals(3 + 1, lodgeService.findAllBannedLodges(user2, 0, 10).getTotalElements());
        }

        @Test
        public void testCreateLodge2()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException {
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));

                assertThrows(InstanceNotFoundException.class,
                                () -> lodgeService.createLodge(190L, "Lodge1@udc.es", "Lodge1", "Description",
                                                "Address",
                                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds,
                                                imageUrls));
        }

        @Test
        public void testGetLodges() throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException {
                Page<Lodge> lodges = lodgeService.getLodges(0, 30);
                assertEquals(30, lodges.getSize());
        }

        @Test
        public void testFindByEmailException() throws InstanceNotFoundException {
                assertThrows(InstanceNotFoundException.class, () -> lodgeService.findByEmail("holanoexisto@udc.es"));
        }

        @Test
        public void testFindByUserId()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException {
                User user = createUser5Args("user1");
                userService.signUp(user);
                List<Long> featureIds = new ArrayList<>(Arrays.asList(1L, 2L, 6L));
                List<String> imageUrls = new ArrayList<>(Arrays.asList("url1", "url2", "url3"));
                Lodge lodge = lodgeService.createLodge(user.getId(), "Lodge1@udc.es", "Lodge1", "Description",
                                "Address",
                                "981981981", "City", "Country", 5, 50, "12:00", "10:00", featureIds, imageUrls);

                assertEquals(1, lodgeService.getLodgesByUserId(user.getId()).size());
        }

        @Test
        public void testFindAllBannedLodges2()
                        throws InstanceNotFoundException, DuplicateInstanceException, InvalidEmailException,
                        InvalidBirthdateException, PermissionException {

                User user = createUser5Args("user1");
                userService.signUp(user);

                assertThrows(PermissionException.class, () -> lodgeService.findAllBannedLodges(user, 0, 10));
        }
}
