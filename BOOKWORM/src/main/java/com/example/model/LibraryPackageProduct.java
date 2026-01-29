package com.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "library_package_product")
public class LibraryPackageProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "package_id", nullable = false)
    private LibraryPackage libraryPackage;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LibraryPackage getLibraryPackage() {
		return libraryPackage;
	}

	public void setLibraryPackage(LibraryPackage libraryPackage) {
		this.libraryPackage = libraryPackage;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}


}

