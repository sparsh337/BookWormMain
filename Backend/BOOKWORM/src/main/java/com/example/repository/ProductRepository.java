package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.Product;
import com.example.model.ProductType;

public interface ProductRepository extends JpaRepository<Product, Integer> {

        @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.authors")
        List<Product> findAll();
        @Query("SELECT p FROM Product p")
        List<Product> findAllProducts();

        @Query("SELECT p FROM Product p WHERE p.genre.genreId = :genreId")
        List<Product> findByGenre(@Param("genreId") Integer genreId);

        @Query("SELECT p FROM Product p WHERE p.language.languageId = :languageId")
        List<Product> findByLanguage(@Param("languageId") Integer languageId);

        @Query("SELECT p FROM Product p WHERE p.genre.genreId = :genreId AND p.language.languageId = :languageId")

        List<Product> findByGenreAndLanguage(@Param("genreId") Integer genreId,
                        @Param("languageId") Integer languageId);

        // Search by name (case insensitive)
        List<Product> findByProductNameContainingIgnoreCase(String productName);

        List<Product> findByProductType(ProductType productType);

        // ✅ NEW: MULTI-FILTER QUERY
        @Query("""
                            SELECT DISTINCT p FROM Product p
                            LEFT JOIN FETCH p.authors
                            WHERE (:genreIds IS NULL OR p.genre.genreId IN :genreIds)
                              AND (:languageIds IS NULL OR p.language.languageId IN :languageIds)
                              AND (:typeIds IS NULL OR p.productType.typeId IN :typeIds)
                        """)
        List<Product> filterProducts(
                        @Param("genreIds") List<Integer> genreIds,
                        @Param("languageIds") List<Integer> languageIds,
                        @Param("typeIds") List<Integer> typeIds);

}
