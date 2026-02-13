package com.example.service;

import com.example.model.Product;
import com.example.repository.ProductRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSearchService {
    private final ProductRepository productRepository;

    public ProductSearchService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> searchByTitle(String query, int limit) {
        String q = query == null ? "" : query.trim();
        if (q.isEmpty()) {
            return List.of();
        }

        int safeLimit = Math.min(Math.max(limit, 1), 50);
        return productRepository.findByProductNameContainingIgnoreCase(q).stream()
                .limit(safeLimit)
                .toList();
    }
}
