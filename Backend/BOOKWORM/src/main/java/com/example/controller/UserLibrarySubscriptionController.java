package com.example.controller;

import com.example.model.UserLibrarySubscription;
import com.example.service.UserLibrarySubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscriptions")
@CrossOrigin
public class UserLibrarySubscriptionController {

    @Autowired
    private UserLibrarySubscriptionService subscriptionService;

    @GetMapping("/active/{userId}")
    public ResponseEntity<?> getActiveSubscription(@PathVariable int userId) {
        UserLibrarySubscription subscription = subscriptionService.getActiveSubscription(userId);
        if (subscription != null) {
            return ResponseEntity.ok(subscription);
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/cancel/{userId}")
    public ResponseEntity<?> cancelSubscription(@PathVariable int userId) {
        subscriptionService.cancelSubscription(userId);
        return ResponseEntity.ok().body("{\"message\": \"Subscription cancelled successfully\"}");
    }
}
