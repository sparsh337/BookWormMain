package com.example.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "user_library_subscription")
public class UserLibrarySubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "package_id", nullable = false)
    private LibraryPackage libraryPackage;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "books_selected_count", nullable = false)
    private Integer booksSelectedCount = 0;

    @Column(name = "active")
    private boolean active = true;

    // getters & setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public LibraryPackage getLibraryPackage() { return libraryPackage; }
    public void setLibraryPackage(LibraryPackage libraryPackage) {
        this.libraryPackage = libraryPackage;
    }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public Integer getBooksSelectedCount() { return booksSelectedCount; }
    public void setBooksSelectedCount(Integer booksSelectedCount) {
        this.booksSelectedCount = booksSelectedCount;
    }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}
