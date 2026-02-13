package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.model.Product;
import com.example.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;

    // Constructor injection (RECOMMENDED)
    public ProductServiceImpl(ProductRepository productRepo) {
        this.productRepo = productRepo;
    }

    @Override
    public Product createProduct(Product product) {
        return productRepo.save(product);
    }

    @Override
    public Optional<Product> getProductById(Integer id) {
        return productRepo.findById(id);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    @Override
    public Product updateProduct(Integer id, Product updatedProduct) {

        Product existingProduct = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        if (updatedProduct.getProductName() != null) {
            existingProduct.setProductName(updatedProduct.getProductName());
        }

        if (updatedProduct.getProductEnglishName() != null) {
            existingProduct.setProductEnglishName(updatedProduct.getProductEnglishName());
        }

        if (updatedProduct.getBasePrice() != null) {
            existingProduct.setBasePrice(updatedProduct.getBasePrice());
        }

        if (updatedProduct.getSpCost() != null) {
            existingProduct.setSpCost(updatedProduct.getSpCost());
        }

        if (updatedProduct.getOfferPrice() != null) {
            existingProduct.setOfferPrice(updatedProduct.getOfferPrice());
        }

        if (updatedProduct.getShortDescription() != null) {
            existingProduct.setShortDescription(updatedProduct.getShortDescription());
        }

        // Boolean needs special handling
        if (updatedProduct.isRentable() != existingProduct.isRentable()) {
            existingProduct.setRentable(updatedProduct.isRentable());
        }

        return productRepo.save(existingProduct);
    }

    @Override
    public void deleteProduct(Integer id) {
        if (!productRepo.existsById(id)) {
            throw new RuntimeException("Product not found with id: " + id);
        }
        productRepo.deleteById(id);
    }
}
