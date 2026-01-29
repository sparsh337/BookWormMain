package com.example.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "library_package")
public class LibraryPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "package_id")
    private Integer packageId;

    @Column(name = "package_name", nullable = false)
    private String packageName; // e.g. "30 Days – 12 Books"

    @Column(name = "price", precision = 10, scale = 2, nullable = false)
    private BigDecimal price; // 200

    @Column(name = "validity_days", nullable = false)
    private Integer validityDays; // 30

    @Column(name = "max_selectable_books", nullable = false)
    private Integer maxSelectableBooks; // 12

    @Column(name = "active")
    private boolean active = true;

    // getters & setters
    public Integer getPackageId() { return packageId; }
    public void setPackageId(Integer packageId) { this.packageId = packageId; }

    public String getPackageName() { return packageName; }
    public void setPackageName(String packageName) { this.packageName = packageName; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getValidityDays() { return validityDays; }
    public void setValidityDays(Integer validityDays) { this.validityDays = validityDays; }

    public Integer getMaxSelectableBooks() { return maxSelectableBooks; }
    public void setMaxSelectableBooks(Integer maxSelectableBooks) {
        this.maxSelectableBooks = maxSelectableBooks;
    }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
