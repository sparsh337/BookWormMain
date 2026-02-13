package com.example.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Table(name = "product_master")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "product_name", nullable = false, length = 150)
    private String productName;

    @Column(name = "product_english_name", length = 150)
    private String productEnglishName;

    /* ---------- MASTER RELATIONS ---------- */
    @ManyToOne
    @JoinColumn(name = "type_id")
    private ProductType productType;

    @ManyToOne
    @JoinColumn(name = "language_id")
    private Language language;

    @ManyToOne
    @JoinColumn(name = "genre_id")
    private Genre genre;

    @ManyToOne
    @JoinColumn(name = "publisher_id")
    private Publisher publisher;

    /* ---------- PRICING ---------- */
    @Column(name = "base_price", precision = 10, scale = 2)
    private BigDecimal basePrice;

    @Column(name = "sp_cost", precision = 10, scale = 2)
    private BigDecimal spCost;

    @Column(name = "offer_price", precision = 10, scale = 2)
    private BigDecimal offerPrice;

    @Column(name = "offer_expiry_date")
    private LocalDate offerExpiryDate;

    /* ---------- DESCRIPTION ---------- */
    @Column(name = "short_desc", length = 255)
    private String shortDescription;

    @Column(name = "long_desc", columnDefinition = "TEXT")
    private String longDescription;

    /* ---------- BOOK DETAILS ---------- */
    @Column(name = "isbn", unique = true, length = 20)
    private String isbn;

    /* ---------- LIBRARY / RENT ---------- */
    @Column(name = "is_rentable")
    private boolean rentable;

    @Column(name = "is_library")
    private boolean library;

    @Column(name = "rent_per_day", precision = 8, scale = 2)
    private BigDecimal rentPerDay;

    @Column(name = "min_rent_days")
    private Integer minRentDays;

    /* ---------- AUTHOR (Many-to-Many) ---------- */
    @ManyToMany(mappedBy = "products")
    private Set<Author> authors = new HashSet<>();

    /* ---------- GETTERS & SETTERS ---------- */
    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductEnglishName() {
        return productEnglishName;
    }

    public void setProductEnglishName(String productEnglishName) {
        this.productEnglishName = productEnglishName;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public BigDecimal getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(BigDecimal basePrice) {
        this.basePrice = basePrice;
    }

    public BigDecimal getSpCost() {
        return spCost;
    }

    public void setSpCost(BigDecimal spCost) {
        this.spCost = spCost;
    }

    public BigDecimal getOfferPrice() {
        return offerPrice;
    }

    public void setOfferPrice(BigDecimal offerPrice) {
        this.offerPrice = offerPrice;
    }

    public LocalDate getOfferExpiryDate() {
        return offerExpiryDate;
    }

    public void setOfferExpiryDate(LocalDate offerExpiryDate) {
        this.offerExpiryDate = offerExpiryDate;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public boolean isRentable() {
        return rentable;
    }

    public void setRentable(boolean rentable) {
        this.rentable = rentable;
    }

    public boolean isLibrary() {
        return library;
    }

    public void setLibrary(boolean library) {
        this.library = library;
    }

    public BigDecimal getRentPerDay() {
        return rentPerDay;
    }

    public void setRentPerDay(BigDecimal rentPerDay) {
        this.rentPerDay = rentPerDay;
    }

    public Integer getMinRentDays() {
        return minRentDays;
    }

    public void setMinRentDays(Integer minRentDays) {
        this.minRentDays = minRentDays;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }
}
