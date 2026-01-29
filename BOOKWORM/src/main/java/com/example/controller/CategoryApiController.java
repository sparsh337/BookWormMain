package com.example.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Genre;
import com.example.model.Language;
import com.example.model.Product;
import com.example.repository.GenreRepository;
import com.example.repository.LanguageRepository;
import com.example.service.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryApiController {

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private LanguageRepository languageRepository;

    @Autowired
    private CategoryService categoryService;

    // =========================
    // GENRES
    // =========================
    @GetMapping("/genres")
    public List<Genre> getGenres() {
        return genreRepository.findAll();
    }

    // =========================
    // LANGUAGES
    // =========================
    @GetMapping("/languages")
    public List<Language> getLanguages() {
        return languageRepository.findAll();
    }

    // =========================
    // PRODUCTS (flat list)
    // =========================
    @GetMapping("/products")
    public List<Product> getProducts(
            @RequestParam(required = false) Integer genreId,
            @RequestParam(required = false) Integer languageId,
            @RequestParam(required = false) String search) {
        return categoryService.getProducts(genreId, languageId, search);
    }

    // =========================
    // PRODUCTS GROUPED BY GENRE
    // =========================
    @GetMapping("/products/grouped")
    public Map<String, List<Product>> getProductsGrouped(
            @RequestParam(required = false) Integer genreId,
            @RequestParam(required = false) Integer languageId) {
        return categoryService.getProductsGroupedByGenre(
                genreId, languageId);
    }

    // =========================
    // MULTI-FILTER
    // =========================
    @GetMapping("/filter")
    public List<Product> filterProducts(
            @RequestParam(required = false) List<Integer> genreIds,
            @RequestParam(required = false) List<Integer> languageIds,
            @RequestParam(required = false) List<Integer> typeIds) {
        return categoryService.filterProducts(genreIds, languageIds, typeIds);
    }

}
