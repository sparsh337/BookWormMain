package com.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "language_master")
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "language_id")
    private Integer languageId;

    @Column(name = "language_desc", length = 50, nullable = false)
    private String languageDesc;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private ProductType productType;

    public int getLanguageId() {
        return languageId;
    }
    public void setLanguageId(int languageId) {
        this.languageId = languageId;
    }

    public String getLanguageDesc() {
        return languageDesc;
    }
    public void setLanguageDesc(String languageDesc) {
        this.languageDesc = languageDesc;
    }

    public ProductType getProductType() {
        return productType;
    }
    public void setProductType(ProductType productType) {
        this.productType = productType;
    }
}