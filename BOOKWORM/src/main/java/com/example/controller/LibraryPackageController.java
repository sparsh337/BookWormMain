package com.example.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.model.Customer;
import com.example.model.LibraryPackage;
import com.example.model.PurchaseRequest;
import com.example.model.UserLibrarySubscription;
import com.example.repository.CustomerRepository;
import com.example.repository.LibraryPackageRepository;
import com.example.repository.UserLibrarySubscriptionRepository;

@RestController
@RequestMapping("/api/library-packages")
@CrossOrigin(origins = "*")
public class LibraryPackageController {

    private final LibraryPackageRepository packageRepository;
    private final UserLibrarySubscriptionRepository subscriptionRepository;
    private final CustomerRepository customerRepository;

    public LibraryPackageController(
            LibraryPackageRepository packageRepository,
            UserLibrarySubscriptionRepository subscriptionRepository,
            CustomerRepository customerRepository) {

        this.packageRepository = packageRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.customerRepository = customerRepository;
    }

    // 1️⃣ List available packages
    @GetMapping
    public List<LibraryPackage> listPackages() {
        return packageRepository.findAll();
    }

    // 2️⃣ Purchase a package (subscription)
    @PostMapping("/purchase")
    public String purchasePackage(@RequestBody PurchaseRequest request) {

        Integer userId = request.getUserId();
        Integer packageId = request.getPackageId();

        Customer customer = customerRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // only one active subscription allowed
        UserLibrarySubscription existing = subscriptionRepository.findByCustomerAndActiveTrue(customer);

        if (existing != null) {
            throw new RuntimeException("User already has an active library subscription");
        }

        LibraryPackage libraryPackage = packageRepository.findById(packageId)
                .orElseThrow(() -> new RuntimeException("Package not found"));

        UserLibrarySubscription subscription = new UserLibrarySubscription();
        subscription.setCustomer(customer);
        subscription.setLibraryPackage(libraryPackage);
        subscription.setStartDate(LocalDate.now());
        subscription.setEndDate(
                LocalDate.now().plusDays(libraryPackage.getValidityDays()));
        subscription.setActive(true);
        subscription.setBooksSelectedCount(0);

        subscriptionRepository.save(subscription);

        return "Library subscription activated";
    }
}
