package com.example.service;

import com.example.model.Cart;
import com.example.model.Customer;
import com.example.model.Product;
import com.example.repository.CartRepository;
import com.example.repository.UserLibrarySubscriptionRepository;
import com.example.repository.ProductRepository;
import com.example.model.UserLibrarySubscription;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class CartService implements ICartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserLibrarySubscriptionRepository subscriptionRepository;

    @Autowired
    private ProductRepository productRepository;

    // 1️⃣ Add product or update quantity
    @Override
    public Cart addOrUpdateProduct(int userId, int productId, int quantity, char tranType, Integer rentDays) {

        Optional<Cart> existing = cartRepository.findByCustomerUserIdAndProductProductId(userId, productId);

        if (existing.isPresent()) {
            Cart cart = existing.get();

            // Rule: No duplicate Buy and Rent.
            // If new type is 'P' (Purchase), we upgrade any existing 'R' (Rent) or 'L'
            // (Library) to 'P'.
            // If new type is 'R' (Rent), we only change if existing wasn't 'P'.
            // If new type is 'L' (Library), we only change if existing wasn't 'P' or 'R'.

            // Latest click wins: overwrite transaction type and rent days
            cart.setTranType(tranType);
            if (tranType == 'P') {
                cart.setRentDays(null);
            } else if (tranType == 'L') {
                cart.setRentDays(0);
            } else {
                cart.setRentDays(rentDays);
            }

            // If same or type changed, quantity is always 1 for eBooks
            cart.setQuantity(1);

            // Validation for Library selection limits (pass productId to exclude from count
            // if exists)
            if (tranType == 'L') {
                validateLibraryLimit(userId, productId);
            }

            return cartRepository.save(cart);
        }

        Customer customer = new Customer();
        customer.setUserId(userId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (tranType == 'L' && !product.isLibrary()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "This book is not available in the library collection");
        }

        if (tranType == 'L') {
            validateLibraryLimit(userId, productId);
        }

        Cart cart = new Cart();
        cart.setCustomer(customer);
        cart.setProduct(product);
        cart.setQuantity(1);
        cart.setTranType(tranType);
        cart.setRentDays(rentDays);

        return cartRepository.save(cart);
    }

    private void validateLibraryLimit(int userId, int currentProductId) {
        UserLibrarySubscription subscription = subscriptionRepository.findByCustomerUserIdAndActiveTrue(userId);

        if (subscription == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "No active library subscription found. Please subscribe to a package first.");
        }

        long existingInCart = cartRepository.findByCustomerUserId(userId).stream()
                .filter(c -> c.getTranType() == 'L')
                .filter(c -> c.getProduct().getProductId() != currentProductId) // Exclude current product to avoid
                                                                                // double counting
                .count();

        if (subscription.getBooksSelectedCount() + existingInCart >= subscription.getLibraryPackage()
                .getMaxSelectableBooks()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Library selection limit reached for your plan ("
                            + subscription.getLibraryPackage().getMaxSelectableBooks() + " books).");
        }
    }

    // 2️⃣ Get all cart items
    @Override
    public List<Cart> getCartByuserId(int userId) {
        return cartRepository.findByCustomerUserId(userId);
    }

    // 3️⃣ Get one cart item
    @Override
    public Optional<Cart> getCartItem(int customerId, int productId) {
        // Since we now support multiple tranTypes for the same product,
        // we might need to adjust this. For now, let's just return any one
        // or the first one found.
        List<Cart> items = cartRepository.findByCustomerUserId(customerId);
        return items.stream()
                .filter(item -> item.getProduct().getProductId() == productId)
                .findFirst();
    }

    // 4️⃣ Remove one product
    @Override
    @Transactional
    public void removeProduct(int customerId, int productId) {
        cartRepository.deleteByCustomerUserIdAndProductProductId(
                customerId, productId);
    }

    // 5️⃣ Clear cart
    @Override
    @Transactional
    public void clearCart(int userId) {
        cartRepository.deleteByCustomerUserId(userId);
    }

    // 6️⃣ Calculate total
    @Override
    public BigDecimal calculateCartTotal(int userId) {

        List<Cart> cartItems = getCartByuserId(userId);
        BigDecimal total = BigDecimal.ZERO;

        for (Cart item : cartItems) {
            BigDecimal itemTotal = BigDecimal.ZERO;
            char type = item.getTranType();

            // LIBRARY
            if (type == 'L') {
                UserLibrarySubscription sub = subscriptionRepository.findByCustomerUserIdAndActiveTrue(userId);
                if (sub != null && sub.getLibraryPackage() != null) {
                    BigDecimal packagePrice = sub.getLibraryPackage().getPrice();
                    int maxBooks = sub.getLibraryPackage().getMaxSelectableBooks();
                    if (maxBooks > 0) {
                        itemTotal = packagePrice.divide(BigDecimal.valueOf(maxBooks), 2,
                                java.math.RoundingMode.HALF_UP);
                    }
                }
            }
            // RENT
            else if (type == 'R') {
                BigDecimal rentPerDay = item.getProduct().getRentPerDay();
                // Default to 1 day if null/0 to avoid calculation errors
                int days = (item.getRentDays() != null && item.getRentDays() > 0) ? item.getRentDays() : 1;

                if (rentPerDay != null) {
                    itemTotal = rentPerDay.multiply(BigDecimal.valueOf(days))
                            .multiply(BigDecimal.valueOf(item.getQuantity()));
                }
            }
            // PURCHASE (Default)
            else {
                BigDecimal price = item.getProduct().getOfferPrice();
                // Check if offer is active (optional, matching InvoiceServiceImpl logic)
                if (price == null) {
                    price = item.getProduct().getSpCost();
                }
                if (price == null) {
                    price = item.getProduct().getBasePrice();
                }

                if (price != null) {
                    itemTotal = price.multiply(BigDecimal.valueOf(item.getQuantity()));
                }
            }

            total = total.add(itemTotal);
        }
        return total;
    }

    @Override
    @Transactional
    public void reduceQuantity(int userId, int productId) {
        // Find all cart items for user
        List<Cart> items = cartRepository.findByCustomerUserId(userId);

        // Find the first one matching the product (usually there's only one P or R
        // item)
        Cart cart = items.stream()
                .filter(item -> item.getProduct().getProductId() == productId)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not found in cart"));

        if (cart.getQuantity() > 1) {
            cart.setQuantity(cart.getQuantity() - 1);
            cartRepository.save(cart);
        } else {
            // quantity == 1 → remove row
            cartRepository.delete(cart);
        }
    }

}
