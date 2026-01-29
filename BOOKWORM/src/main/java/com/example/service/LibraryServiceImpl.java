package com.example.service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Customer;
import com.example.model.Product;
import com.example.model.UserLibraryBook;
import com.example.model.UserLibrarySubscription;
import com.example.repository.CustomerRepository;
import com.example.repository.LibraryPackageProductRepository;
import com.example.repository.ProductRepository;
import com.example.repository.UserLibraryBookRepository;
import com.example.repository.UserLibrarySubscriptionRepository;

@Service
@Transactional
public class LibraryServiceImpl implements LibraryService {

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final UserLibrarySubscriptionRepository subscriptionRepository;
    private final UserLibraryBookRepository libraryBookRepository;
    private final LibraryPackageProductRepository libraryPackageProductRepository;
    // private final RoyaltyTransactionService royaltyService;

    public LibraryServiceImpl(
            CustomerRepository customerRepository,
            ProductRepository productRepository,
            UserLibrarySubscriptionRepository subscriptionRepository,
            UserLibraryBookRepository libraryBookRepository,
            LibraryPackageProductRepository libraryPackageProductRepository,
            RoyaltyTransactionService royaltyService) {

        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.libraryBookRepository = libraryBookRepository;
        this.libraryPackageProductRepository = libraryPackageProductRepository;
        // this.royaltyService = royaltyService;
    }

    @Override
    public void selectBookFromLibrary(Integer userId, Integer productId) {

        // 1️⃣ Fetch user
        Customer customer = customerRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2️⃣ Fetch product
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // 3️⃣ Validate product is library-allowed
        if (!product.isLibrary()) {
            throw new RuntimeException("Product not allowed in library");
        }

        // 4️⃣ Fetch active subscription
        UserLibrarySubscription subscription = subscriptionRepository.findByCustomerAndActiveTrue(customer);

        if (subscription == null) {
            throw new RuntimeException("No active library subscription");
        }

        // 5️⃣ Check subscription expiry
        if (LocalDate.now().isAfter(subscription.getEndDate())) {
            subscription.setActive(false);
            subscriptionRepository.save(subscription);
            throw new RuntimeException("Library subscription expired");
        }

        // 6️⃣ Check selection limit
        if (subscription.getBooksSelectedCount() >= subscription.getLibraryPackage().getMaxSelectableBooks()) {

            subscription.setActive(false);
            subscriptionRepository.save(subscription);
            throw new RuntimeException("Library selection limit reached");
        }

        // ✅ NEW: Validate book belongs to this package
        boolean allowed = libraryPackageProductRepository
                .existsByLibraryPackageAndProduct(
                        subscription.getLibraryPackage(),
                        product);

        if (!allowed) {
            throw new RuntimeException("This book is not part of your package");
        }

        // 7️⃣ Prevent duplicate selection
        boolean alreadySelected = libraryBookRepository.existsByCustomerAndProductAndSubscription(
                customer, product, subscription);

        if (alreadySelected) {
            throw new RuntimeException("Book already selected in this subscription");
        }

        // 8️⃣ Add book to user's library
        UserLibraryBook libraryBook = new UserLibraryBook();
        libraryBook.setCustomer(customer);
        libraryBook.setProduct(product);
        libraryBook.setSubscription(subscription);
        libraryBook.setSelectedDate(LocalDate.now());
        libraryBook.setExpiryDate(subscription.getEndDate());

        libraryBookRepository.save(libraryBook);

        // // 9️⃣ Calculate per-book value
        // BigDecimal perBookValue =
        // subscription.getLibraryPackage()
        // .getPrice()
        // .divide(
        // BigDecimal.valueOf(
        // subscription.getLibraryPackage().getMaxSelectableBooks()
        // ),
        // 2,
        // RoundingMode.HALF_UP
        // );

        // // 🔟 Generate royalty
        // royaltyService.generateRoyalty(
        // productId,
        // userId,
        // perBookValue,
        // "LIBRARY_SUBSCRIPTION",
        // subscription.getId()
        // );

        // 1️⃣1️⃣ Update subscription usage
        subscription.setBooksSelectedCount(
                subscription.getBooksSelectedCount() + 1);

        if (subscription.getBooksSelectedCount() >= subscription.getLibraryPackage().getMaxSelectableBooks()) {
            subscription.setActive(false);
        }

        subscriptionRepository.save(subscription);
    }
}
