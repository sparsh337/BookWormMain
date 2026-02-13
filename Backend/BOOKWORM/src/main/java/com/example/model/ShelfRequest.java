package com.example.model;

public class ShelfRequest {

	private int userId;
	private int productId;
	private char tranType; // 'P' = Purchase, 'R' = Rent, 'L' = Library
	private Integer rentDays; // only needed for Rent/Library

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public char getTranType() {
		return tranType;
	}

	public void setTranType(char tranType) {
		this.tranType = tranType;
	}

	public Integer getRentDays() {
		return rentDays;
	}

	public void setRentDays(Integer rentDays) {
		this.rentDays = rentDays;
	}
}
