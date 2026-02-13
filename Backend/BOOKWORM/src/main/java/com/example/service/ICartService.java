/*
 * package com.example.services;
 * 
 * import com.example.model.Cart; import com.example.model.Product;
 * 
 * import java.math.BigDecimal; import java.util.List; import
 * java.util.Optional;
 * 
 * public interface ICartService {
 * 
 * Cart addOrUpdateProduct(int customerId, Product product, int quantity);
 * 
 * List<Cart> getCartByCustomerId(int customerId);
 * 
 * Optional<Cart> getCartItem(int customerId, int productId);
 * 
 * void removeProduct(int customerId, int productId);
 * 
 * void clearCart(int customerId);
 * 
 * BigDecimal calculateCartTotal(int customerId); }
 */

package com.example.service;

import com.example.model.Cart;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ICartService {

    Cart addOrUpdateProduct(int userId, int productId, int quantity, char tranType, Integer rentDays);

    List<Cart> getCartByuserId(int userId);

    Optional<Cart> getCartItem(int userId, int productId);

    void removeProduct(int userId, int productId);

    void clearCart(int userId);

    BigDecimal calculateCartTotal(int userId);

    void reduceQuantity(int userId, int productId);

}
