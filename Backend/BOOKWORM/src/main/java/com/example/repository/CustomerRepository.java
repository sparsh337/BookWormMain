package com.example.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.model.Customer;

public interface CustomerRepository
        extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByUserName(String userName);

    Optional<Customer> findByUserMail(String userMail);

    boolean existsByUserMail(String userMail);
}
