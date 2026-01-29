package com.example.service;

import com.example.model.Product;
import com.example.model.ProductType;
import com.example.repository.ProductRepository;
import com.example.repository.ProductTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl extends CategoryService {

    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;

    public CategoryServiceImpl(ProductRepository productRepository,
            ProductTypeRepository productTypeRepository) {
        this.productRepository = productRepository;
        this.productTypeRepository = productTypeRepository;
    }

    @Override
    public List<Product> getProductsByType(String typeDesc) {

        ProductType productType = productTypeRepository
                .findByTypeDescIgnoreCase(typeDesc)
                .orElseThrow(() -> new RuntimeException("Product type not found: " + typeDesc));

        return productRepository.findByProductType(productType);
    }

    @Override
    public List<ProductType> getAllProductTypes() {
        return productTypeRepository.findAll();
    }
}
