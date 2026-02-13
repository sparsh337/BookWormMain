package com.example.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "product_ben_master")
public class ProductBeneficiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_ben_id")
    private int prodBenId;

    @ManyToOne
    @JoinColumn(name = "ben_id")
    private Beneficiary beneficiary;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "percentage", precision = 5, scale = 2, nullable = false)
    private BigDecimal percentage;

    public int getProdBenId() { return prodBenId; }
    public void setProdBenId(int prodBenId) { this.prodBenId = prodBenId; }

    public Beneficiary getBeneficiary() { return beneficiary; }
    public void setBeneficiary(Beneficiary beneficiary) { this.beneficiary = beneficiary; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public BigDecimal getPercentage() { return percentage; }
    public void setPercentage(BigDecimal percentage) { this.percentage = percentage; }
}
