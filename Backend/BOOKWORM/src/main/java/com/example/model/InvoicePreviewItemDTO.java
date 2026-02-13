package com.example.model;

import java.math.BigDecimal;

public class InvoicePreviewItemDTO {

    private Integer productId;
    private String productName;
    private char tranType;      // P / R / L

    private Integer quantity;     // for purchase
    private Integer rentDays;     // for rent / lend

    private BigDecimal unitPrice; // price per unit / per day
    private BigDecimal totalPrice;
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
	public char getTranType() {
		return tranType;
	}
	public void setTranType(char tranType) {
		this.tranType = tranType;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Integer getRentDays() {
		return rentDays;
	}
	public void setRentDays(Integer rentDays) {
		this.rentDays = rentDays;
	}
	public BigDecimal getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}
	public BigDecimal getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

    // getters & setters
}

