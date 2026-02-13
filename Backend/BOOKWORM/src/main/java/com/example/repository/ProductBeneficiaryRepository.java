package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

//import com.example.model.Product;
import com.example.model.ProductBeneficiary;

public interface ProductBeneficiaryRepository
extends JpaRepository<ProductBeneficiary, Integer> {

List<ProductBeneficiary> findByProductProductId(Integer productId);
}
