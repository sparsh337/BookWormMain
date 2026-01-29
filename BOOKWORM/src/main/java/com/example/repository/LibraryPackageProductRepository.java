package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.LibraryPackage;
import com.example.model.LibraryPackageProduct;
import com.example.model.Product;

public interface LibraryPackageProductRepository
extends JpaRepository<LibraryPackageProduct, Integer> {

boolean existsByLibraryPackageAndProduct(
    LibraryPackage libraryPackage,
    Product product
);

List<LibraryPackageProduct> findByLibraryPackage(
    LibraryPackage libraryPackage
);
}

