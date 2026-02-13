package com.example.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Cart;
import com.example.service.ICartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private ICartService cartService;

    // 1️⃣ Add product to cart / update quantity
    @PostMapping("/add")
    public Cart addToCart(
            @RequestParam int userId,
            @RequestParam int productId,
            @RequestParam int quantity,
            @RequestParam(required = false, defaultValue = "P") char tranType,
            @RequestParam(required = false) Integer rentDays) {

        return cartService.addOrUpdateProduct(userId, productId, quantity, tranType, rentDays);
    }

    // 2️⃣ Get all cart items of a customer
    @GetMapping("/{userId}")
    public List<Cart> getCartByCustomerId(
            @PathVariable int userId) {

        return cartService.getCartByuserId(userId);
    }

    // 3️⃣ Get specific product from cart
    @GetMapping("/{userId}/product/{productId}")
    public Optional<Cart> getCartItem(
            @PathVariable int userId,
            @PathVariable int productId) {

        return cartService.getCartItem(userId, productId);
    }

    // 4️⃣ Remove one product from cart
    @DeleteMapping("/{userId}/product/{productId}")
    public void removeProduct(
            @PathVariable int userId,
            @PathVariable int productId) {

        cartService.removeProduct(userId, productId);
    }

    // 5️⃣ Clear entire cart
    @DeleteMapping("/clear/{userId}")
    public void clearCart(
            @PathVariable int userId) {

        cartService.clearCart(userId);
    }

    // 6️⃣ Calculate cart total
    @GetMapping("/total/{userId}")
    public BigDecimal calculateTotal(
            @PathVariable int userId) {

        return cartService.calculateCartTotal(userId);
    }

    // ===============================================================================================================
    @PutMapping("/{userId}/product/{productId}/decrease")
    public void reduceQuantity(
            @PathVariable int userId,
            @PathVariable int productId) {

        cartService.reduceQuantity(userId, productId);
    }

}
