package com.example.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.model.Customer;
import com.example.model.LibraryPackage;
import com.example.model.PurchaseRequest;
import com.example.model.UserLibrarySubscription;
import com.example.repository.CustomerRepository;
import com.example.repository.InvoiceDetailRepository;
import com.example.repository.InvoiceRepository;
import com.example.repository.LibraryPackageRepository;
import com.example.repository.UserLibrarySubscriptionRepository;

@RestController
@RequestMapping("/api/library-packages")
@CrossOrigin(origins = "*")
public class LibraryPackageController {

    private final LibraryPackageRepository packageRepository;
    private final UserLibrarySubscriptionRepository subscriptionRepository;
    private final CustomerRepository customerRepository;
    private final InvoiceRepository invoiceRepository;
    private final InvoiceDetailRepository invoiceDetailRepository;
    private final com.example.service.InvoicePdfService invoicePdfService;
    private final com.example.service.EmailService emailService;

    public LibraryPackageController(
            LibraryPackageRepository packageRepository,
            UserLibrarySubscriptionRepository subscriptionRepository,
            CustomerRepository customerRepository,
            InvoiceRepository invoiceRepository,
            InvoiceDetailRepository invoiceDetailRepository,
            com.example.service.InvoicePdfService invoicePdfService,
            com.example.service.EmailService emailService) {

        this.packageRepository = packageRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.customerRepository = customerRepository;
        this.invoiceRepository = invoiceRepository;
        this.invoiceDetailRepository = invoiceDetailRepository;
        this.invoicePdfService = invoicePdfService;
        this.emailService = emailService;
    }

    // 1️⃣ List available packages
    @GetMapping
    public List<LibraryPackage> listPackages() {
        return packageRepository.findAll();
    }

    // 2️⃣ Purchase a package (subscription)
    @PostMapping("/purchase")
    public java.util.Map<String, Object> purchasePackage(@RequestBody PurchaseRequest request) {

        Integer userId = request.getUserId();
        Integer packageId = request.getPackageId();

        Customer customer = customerRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // only one active subscription allowed
        UserLibrarySubscription existing = subscriptionRepository.findByCustomerAndActiveTrue(customer);

        if (existing != null) {
            if (LocalDate.now().isAfter(existing.getEndDate())) {
                existing.setActive(false);
                subscriptionRepository.save(existing);
            } else {
                throw new RuntimeException("User already has an active library subscription");
            }
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

        // --- Generate Invoice ---
        com.example.model.Invoice invoice = new com.example.model.Invoice();
        invoice.setUserId(userId);
        invoice.setInvoiceDate(LocalDate.now());
        invoice.setInvoiceAmount(libraryPackage.getPrice());
        invoiceRepository.save(invoice);

        com.example.model.InvoiceDetail detail = new com.example.model.InvoiceDetail();
        detail.setInvoice(invoice);
        detail.setProductName(libraryPackage.getPackageName()); // No product link, just text
        detail.setTranType('L'); // L for Library Subscription
        detail.setQuantity(1);
        detail.setBasePrice(libraryPackage.getPrice());
        detail.setSalePrice(libraryPackage.getPrice());
        detail.setRentNoOfDays(libraryPackage.getValidityDays());
        
        invoiceDetailRepository.save(detail);

        // --- Generate PDF & Send Email ---
        try {
            byte[] pdfBytes = invoicePdfService.generateInvoicePdf(invoice, java.util.Collections.singletonList(detail));
            emailService.sendInvoiceEmail(customer, invoice, pdfBytes);
        } catch (Exception e) {
            System.err.println("Error sending invoice email for package: " + e.getMessage());
            // Don't fail the transaction just for email
        }

        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("message", "Library subscription activated");
        response.put("invoiceId", invoice.getInvoiceId());
        
        return response;
    }
}
