// package com.example.service;
// import java.util.List;
// import java.util.Map;
// import java.util.stream.Collectors;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import com.example.model.Product;
// import com.example.repository.ProductRepository;
// @Service
// public class CategoryService {
//     @Autowired
//     private ProductRepository productRepository;
//     public List<Product> getProducts(Integer genreId, Integer languageId, String search) {
//         if (search != null && !search.trim().isEmpty()) {
//             return productRepository.findByProductNameContainingIgnoreCase(search.trim());
//         }
//         if (genreId == null && languageId == null) {
//             return productRepository.findAllProducts();
//         }
//         if (genreId != null && languageId == null) {
//             return productRepository.findByGenre(genreId);
//         }
//         if (genreId == null) {
//             return productRepository.findByLanguage(languageId);
//         }
//         return productRepository.findByGenreAndLanguage(genreId, languageId);
//     }
//     public Map<String, List<Product>> getProductsGroupedByGenre(
//             Integer genreId, Integer languageId) {
//         List<Product> products = getProducts(genreId, languageId, null);
//         return products.stream()
//                 .collect(Collectors.groupingBy(
//                         p -> p.getGenre().getGenreDesc()));
//     }
// }
package com.example.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.Product;
import com.example.model.ProductType;
import com.example.repository.ProductRepository;
import com.example.repository.ProductTypeRepository;

@Service
public class CategoryService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    public List<Product> getProducts(Integer genreId, Integer languageId, String search) {

        if (search != null && !search.trim().isEmpty()) {
            return productRepository.findByProductNameContainingIgnoreCase(search.trim());
        }

        if (genreId == null && languageId == null) {
            return productRepository.findAllProducts();
        }
        if (genreId != null && languageId == null) {
            return productRepository.findByGenre(genreId);
        }
        if (genreId == null) {
            return productRepository.findByLanguage(languageId);
        }
        return productRepository.findByGenreAndLanguage(genreId, languageId);
    }

    public Map<String, List<Product>> getProductsGroupedByGenre(
            Integer genreId, Integer languageId) {

        List<Product> products = getProducts(genreId, languageId, null);

        return products.stream()
                .collect(Collectors.groupingBy(
                        p -> p.getGenre().getGenreDesc()));
    }

    // ✅ FIXED: implemented method
    public List<Product> getProductsByType(String typeDesc) {

        ProductType productType = productTypeRepository
                .findByTypeDescIgnoreCase(typeDesc)
                .orElseThrow(() -> new RuntimeException("Invalid product type: " + typeDesc));

        return productRepository.findByProductType(productType);
    }

    // ✅ FIXED: implemented method
    public List<ProductType> getAllProductTypes() {
        return productTypeRepository.findAll();
    }

    // ================= ✅ NEW: MULTI-FILTER =================
    public List<Product> filterProducts(
            List<Integer> genreIds,
            List<Integer> languageIds,
            List<Integer> typeIds) {

        genreIds = (genreIds == null || genreIds.isEmpty()) ? null : genreIds;
        languageIds = (languageIds == null || languageIds.isEmpty()) ? null : languageIds;
        typeIds = (typeIds == null || typeIds.isEmpty()) ? null : typeIds;

        return productRepository.filterProducts(
                genreIds,
                languageIds,
                typeIds);
    }

}
