package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.model.LibraryPackage;

public interface LibraryPackageRepository
        extends JpaRepository<LibraryPackage, Integer> {
}
