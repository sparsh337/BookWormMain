package com.example.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Customer;
import com.example.model.Product;
import com.example.model.UserLibraryBook;
import com.example.model.UserLibrarySubscription;

public interface UserLibraryBookRepository
                extends JpaRepository<UserLibraryBook, Integer> {

        boolean existsByCustomerAndProductAndSubscription(
                        Customer customer,
                        Product product,
                        UserLibrarySubscription subscription);

        List<UserLibraryBook> findByCustomerAndExpiryDateAfter(
                        Customer customer,
                        LocalDate date);

        void deleteBySubscription(UserLibrarySubscription subscription);
}
