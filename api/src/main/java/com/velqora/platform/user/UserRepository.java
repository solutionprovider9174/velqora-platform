package com.velqora.platform.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("""
            select distinct u from User u
            left join fetch u.roles r
            left join fetch r.permissions
            where lower(u.email) = lower(:email)
            """)
    Optional<User> findWithRolesByEmail(@Param("email") String email);
}