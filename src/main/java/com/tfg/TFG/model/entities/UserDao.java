package com.tfg.TFG.model.entities;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Long> {
    /**
     * Exists by user name.
     * 
     * @param userName the user name
     * @return true, if successful
     */
    boolean existsByUserName(String userName);

    /**
     * Find by user name.
     * 
     * @param userName the user name
     * @return the optional
     */
    Optional<User> findByUserName(String userName);
}
