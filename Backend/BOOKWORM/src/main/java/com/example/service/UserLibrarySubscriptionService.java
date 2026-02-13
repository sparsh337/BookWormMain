package com.example.service;

import com.example.model.UserLibrarySubscription;
import com.example.repository.UserLibrarySubscriptionRepository;
import com.example.repository.UserLibraryBookRepository;
import com.example.repository.ShelfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserLibrarySubscriptionService {

    @Autowired
    private UserLibrarySubscriptionRepository subscriptionRepository;

    @Autowired
    private UserLibraryBookRepository libraryBookRepository;

    @Autowired
    private ShelfRepository shelfRepository;

    @org.springframework.transaction.annotation.Transactional
    public UserLibrarySubscription getActiveSubscription(int userId) {
        UserLibrarySubscription subscription = subscriptionRepository.findByCustomerUserIdAndActiveTrue(userId);

        if (subscription != null) {
            java.time.LocalDate today = java.time.LocalDate.now();
            if (today.isAfter(subscription.getEndDate())) {
                // Subscription has expired
                subscription.setActive(false);
                subscriptionRepository.save(subscription);

                // Clear any library books ('L') added via this subscription
                shelfRepository.deleteByUserIdAndTranType(userId, 'L');

                return null; // No longer active
            }
        }
        return subscription;
    }

    @Transactional
    public void cancelSubscription(int userId) {
        UserLibrarySubscription subscription = subscriptionRepository.findByCustomerUserIdAndActiveTrue(userId);
        if (subscription == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No active subscription found to cancel.");
        }
        // User requested removal from database
        // First delete dependent books (both legacy UserLibraryBook and actual MyShelf
        // items)
        libraryBookRepository.deleteBySubscription(subscription);
        shelfRepository.deleteByUserIdAndTranType(userId, 'L');

        subscriptionRepository.delete(subscription);
    }
}
