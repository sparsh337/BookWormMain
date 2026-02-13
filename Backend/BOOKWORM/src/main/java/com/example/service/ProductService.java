package com.example.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.model.Product;

import java.util.List;
@Service
public interface ProductService {

    Product createProduct(Product product);

    Optional<Product> getProductById(Integer id);

    List<Product> getAllProducts();

    Product updateProduct(Integer id, Product product);

    void deleteProduct(Integer id);
}
