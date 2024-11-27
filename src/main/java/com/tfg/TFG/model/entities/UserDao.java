package com.tfg.TFG.model.entities;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserDao extends JpaRepository<User, Long> {
    /**
     * Exists by user name.
     * 
     * @param userName the user name
     * @return true, if successful
     */
    boolean existsByEmail(String email);

    /**
     * Find by user name.
     * 
     * @param userName the user name
     * @return the optional
     */
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.status = 1")
    Page<User> findAllBannedUsers(Pageable pageable);
}
