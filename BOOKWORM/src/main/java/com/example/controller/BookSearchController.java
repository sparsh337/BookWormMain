package com.example.controller;

import com.example.model.Product;
import com.example.service.ProductSearchService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookSearchController {

    private final ProductSearchService productSearchService;

    public BookSearchController(ProductSearchService productSearchService) {
        this.productSearchService = productSearchService;
    }

    @GetMapping("/search")
    public List<BookSearchResultDto> search(@RequestParam("query") String query,
                                           @RequestParam(value = "limit", defaultValue = "20") int limit) {
        return productSearchService.searchByTitle(query, limit)
                .stream()
                .map(BookSearchResultDto::fromProduct)
                .toList();
    }

    public record BookSearchResultDto(
            Integer id,
            String title,
            String englishTitle,
            BigDecimal basePrice,
            BigDecimal offerPrice,
            boolean rentable,
            boolean library
    ) {
        public static BookSearchResultDto fromProduct(Product p) {
            return new BookSearchResultDto(
                    p.getProductId(),
                    p.getProductName(),
                    p.getProductEnglishName(),
                    p.getBasePrice(),
                    p.getOfferPrice(),
                    p.isRentable(),
                    p.isLibrary()
            );
        }
    }
}

