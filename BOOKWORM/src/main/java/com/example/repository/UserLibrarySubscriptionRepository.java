package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Customer;
import com.example.model.UserLibrarySubscription;

public interface UserLibrarySubscriptionRepository
        extends JpaRepository<UserLibrarySubscription, Integer> {

    UserLibrarySubscription findByCustomerAndActiveTrue(Customer customer);

    public UserLibrarySubscription findByCustomerUserIdAndActiveTrue(int userId);
}
