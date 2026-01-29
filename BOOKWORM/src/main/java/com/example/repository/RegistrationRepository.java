package com.example.repository; 

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.example.model.Customer;

@Repository
public interface RegistrationRepository extends JpaRepository<Customer, Integer> {
    boolean existsByUserMail(String userMail);
    boolean existsByPhoneNo(String phoneNo);
    Optional<Customer> findByUserMail(String userMail);

    
}
