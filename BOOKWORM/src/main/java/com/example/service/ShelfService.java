package com.example.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.model.MyShelf;
import com.example.model.Product;
import com.example.model.UserLibrarySubscription;
import com.example.repository.ProductRepository;
import com.example.repository.ShelfRepository;
import com.example.repository.UserLibrarySubscriptionRepository;
import jakarta.transaction.Transactional;

@Service
public class ShelfService {

    private final ProductRepository prorepo;
    private final ShelfRepository shelfrepos;
    private final RoyaltyTransactionService royaltyTransactionService;
    private final UserLibrarySubscriptionRepository subscriptionRepository;

    public ShelfService(
            ShelfRepository shelfrepos,
            ProductRepository prorepo,
            RoyaltyTransactionService royaltyTransactionService,
            UserLibrarySubscriptionRepository subscriptionRepository) {

        this.shelfrepos = shelfrepos;
        this.prorepo = prorepo;
        this.royaltyTransactionService = royaltyTransactionService;
        this.subscriptionRepository = subscriptionRepository;
    }

    // MyShelf (Purchased only)
    public List<MyShelf> getmyshelf(int userId) {
        return shelfrepos.findByUserIdAndTranType(userId, 'P');
    }

    // My Library (Rent + Lend)
    public List<MyShelf> getmylibrary(int userId) {

        List<MyShelf> list = shelfrepos.findByUserIdAndTranTypeIn(userId, List.of('R', 'L'));
        LocalDate today = LocalDate.now();

        return list.stream()
                .filter(item -> item.getProductExpiryDate() == null ||
                        !item.getProductExpiryDate().isBefore(today))
                .toList();
    }

    public List<MyShelf> getAllShelfItems() {
        return shelfrepos.findAll();
    }

    public List<MyShelf> getAllLibraryItems() {
        return shelfrepos.findByTranTypeIn(List.of('R', 'L'));
    }

    // ---------------- ADD TO SHELF (P / R) ----------------
    public MyShelf addToShelf(int productId, int userId, char tranType, Integer rentDays) {

        // Check for ANY active instance
        List<MyShelf> existing = shelfrepos.findByUserIdAndProductProductId(userId, productId);
        LocalDate now = LocalDate.now();

        boolean isActive = existing.stream().anyMatch(item -> {
            if (item.getTranType() == 'P')
                return true;
            return item.getProductExpiryDate() != null && !item.getProductExpiryDate().isBefore(now);
        });

        if (isActive) {
            throw new RuntimeException("Book already exists in your My Shelf (Active)");
        }

        Product product = prorepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        MyShelf shelf = new MyShelf();
        shelf.setUserId(userId);
        shelf.setProduct(product);
        shelf.setTranType(tranType);

        // expiry date logic
        if (tranType == 'P') {
            shelf.setProductExpiryDate(null);
        } else if (tranType == 'R') {

            // rentDays must be provided
            if (rentDays == null || rentDays <= 0) {
                throw new RuntimeException("rentDays must be > 0 for Rent (R)");
            }

            shelf.setProductExpiryDate(LocalDate.now().plusDays(rentDays));
        }

        MyShelf saved = shelfrepos.save(shelf);

        // ✅ Royalty logic
        if (tranType == 'P') {

            BigDecimal purchaseAmount = (product.getOfferPrice() != null)
                    ? product.getOfferPrice()
                    : product.getSpCost();

            if (purchaseAmount == null) {
                throw new RuntimeException("Purchase amount is null (offerPrice/spCost missing)");
            }

            royaltyTransactionService.generateRoyalty(userId, product, 'P', purchaseAmount);

        } else if (tranType == 'R') {

            if (product.getRentPerDay() == null) {
                throw new RuntimeException("rentPerDay is null for this product");
            }

            BigDecimal rentAmount = product.getRentPerDay()
                    .multiply(BigDecimal.valueOf(rentDays));

            royaltyTransactionService.generateRoyalty(userId, product, 'R', rentAmount);
        }

        return saved;
    }

    // ---------------- REMOVE FROM SHELF ----------------
    @Transactional
    public void removeFromShelf(int userId, int productId, char tranType) {
        // Use a list to handle potential duplicates in the database
        List<MyShelf> items = shelfrepos.findByUserIdAndProductProductIdAndTranType(userId, productId, tranType);

        if (items.isEmpty()) {
            throw new RuntimeException("Item Not Found in Shelf");
        }

        // If it's a Library book (L), decrement the subscription count
        if (tranType == 'L') {
            UserLibrarySubscription sub = subscriptionRepository.findByCustomerUserIdAndActiveTrue(userId);
            if (sub != null && sub.getBooksSelectedCount() > 0) {
                // Decrement for each entry being removed (usually just 1)
                int newCount = Math.max(0, sub.getBooksSelectedCount() - items.size());
                sub.setBooksSelectedCount(newCount);
                sub.setActive(true);
                subscriptionRepository.save(sub);
            }
        }

        shelfrepos.deleteAll(items);
    }

    @Transactional
    public void removeById(int shelfId) {
        MyShelf item = shelfrepos.findById(shelfId).orElse(null);
        if (item != null) {
            if (item.getTranType() == 'L') {
                UserLibrarySubscription sub = subscriptionRepository
                        .findByCustomerUserIdAndActiveTrue(item.getUserId());
                if (sub != null && sub.getBooksSelectedCount() > 0) {
                    sub.setBooksSelectedCount(sub.getBooksSelectedCount() - 1);
                    sub.setActive(true);
                    subscriptionRepository.save(sub);
                }
            }
            shelfrepos.delete(item);
        }
    }

    // ---------------- LEND FROM SUBSCRIPTION (L) ----------------
    public MyShelf lendFromSubscription(int userId, int productId) {

        // Check for ANY active instance (P, R, or L)
        List<MyShelf> existing = shelfrepos.findByUserIdAndProductProductId(userId, productId);
        LocalDate now = LocalDate.now();

        boolean isActive = existing.stream().anyMatch(item -> {
            if (item.getTranType() == 'P')
                return true;
            return item.getProductExpiryDate() != null && !item.getProductExpiryDate().isBefore(now);
        });

        if (isActive) {
            throw new RuntimeException("Book already exists in your My Shelf/Library (Active)");
        }

        Product product = prorepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        if (!product.isLibrary()) {
            throw new RuntimeException("Product not allowed in Library");
        }

        // fetch active subscription
        UserLibrarySubscription subscription = subscriptionRepository.findByCustomerUserIdAndActiveTrue(userId);

        if (subscription == null) {
            throw new RuntimeException("No active library subscription");
        }

        // check expiry
        LocalDate today = LocalDate.now();
        if (today.isAfter(subscription.getEndDate())) {
            subscription.setActive(false);
            subscriptionRepository.save(subscription);
            throw new RuntimeException("Library subscription expired");
        }

        // check selection limit
        int maxBooks = subscription.getLibraryPackage().getMaxSelectableBooks();
        int selected = subscription.getBooksSelectedCount();

        if (selected >= maxBooks) {
            throw new RuntimeException("Library selection limit reached");
        }

        // add shelf entry
        MyShelf shelf = new MyShelf();
        shelf.setUserId(userId);
        shelf.setProduct(product);
        shelf.setTranType('L');
        shelf.setProductExpiryDate(subscription.getEndDate()); // expiry = subscription end date

        MyShelf saved = shelfrepos.save(shelf);

        // ✅ Per book value = package price / max selectable books
        BigDecimal packagePrice = subscription.getLibraryPackage().getPrice();

        BigDecimal perBookValue = packagePrice.divide(
                BigDecimal.valueOf(maxBooks),
                2,
                RoundingMode.HALF_UP);

        // ✅ Generate royalty for L (subscription)
        royaltyTransactionService.generateRoyalty(userId, product, 'L', perBookValue);

        // update subscription usage
        subscription.setBooksSelectedCount(selected + 1);

        subscriptionRepository.save(subscription);

        return saved;
    }
}