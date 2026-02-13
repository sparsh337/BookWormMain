/*
 * package com.example.repository;
 * 
 * import com.example.model.Cart; import
 * org.springframework.data.jpa.repository.JpaRepository; import
 * org.springframework.stereotype.Repository;
 * 
 * import java.util.List; import java.util.Optional;
 * 
 * @Repository public interface CartRepository extends JpaRepository<Cart,
 * Integer> {
 * 
 * // All cart items of a customer List<Cart> findByCustomerCustomerId(int
 * customerId);
 * 
 * // Check if product already exists in cart Optional<Cart>
 * findByCustomerCustomerIdAndProductProductId( int customerId, int productId );
 * 
 * // Delete one product from cart void
 * deleteByCustomerCustomerIdAndProductProductId( int customerId, int productId
 * );
 * 
 * // Clear full cart void deleteByCustomerCustomerId(int customerId); }
 */

package com.example.repository;

import com.example.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

        // All cart items of a user
        List<Cart> findByCustomerUserId(int userId);

        // Check if product already exists in cart
        Optional<Cart> findByCustomerUserIdAndProductProductId(
                        int userId,
                        int productId);

        // Delete one product from cart
        void deleteByCustomerUserIdAndProductProductId(
                        int userId,
                        int productId);

        // Clear full cart
        void deleteByCustomerUserId(int userId);

}
