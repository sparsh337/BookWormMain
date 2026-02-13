package com.example.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "royalty_transaction")
public class RoyaltyTransaction {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	// kis user ne transaction kiya (MyShelf jaisa)
	@Column(name = "user_id", nullable = false)
	private int userId;

	// kis product ka transaction hua
	@ManyToOne
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	// kis author ko royalty milega
	@ManyToOne
	@JoinColumn(name = "author_id", nullable = false)
	private Author author;

	// P = Purchase, R = Rent, L = Library
	@Column(name = "tran_type", nullable = false, length = 1)
	private char tranType;

	@Column(name = "qty", nullable = false)
	private int quantity;

	// actual selling price (purchase me offerPrice/spCost)
	// rent me total rent amount
	@Column(name = "sale_price", precision = 10, scale = 2)
	private BigDecimal salePrice;

	@Column(name = "base_price", precision = 10, scale = 2)
	private BigDecimal basePrice;

	@Column(name = "royalty_percent", precision = 5, scale = 2)
	private BigDecimal royaltyPercent;

	@Column(name = "royalty_amount", precision = 10, scale = 2)
	private BigDecimal royaltyAmount;

	@Column(name = "rent_days")
	private Integer rentDays;

	@Column(name = "rent_start_date")
	private LocalDateTime rentStartDate;

	@Column(name = "rent_end_date")
	private LocalDateTime rentEndDate;

	@ManyToOne
	@JoinColumn(name = "invoice_id", nullable = true)
	private Invoice invoice;

	@Column(name = "transaction_date", nullable = false)
	private LocalDateTime transactionDate;

	@Column(name = "remarks", length = 255)
	private String remarks;

	// ---------------- GETTERS / SETTERS ----------------

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public char getTranType() {
		return tranType;
	}

	public void setTranType(char tranType) {
		this.tranType = tranType;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(BigDecimal salePrice) {
		this.salePrice = salePrice;
	}

	public BigDecimal getBasePrice() {
		return basePrice;
	}

	public void setBasePrice(BigDecimal basePrice) {
		this.basePrice = basePrice;
	}

	public BigDecimal getRoyaltyPercent() {
		return royaltyPercent;
	}

	public void setRoyaltyPercent(BigDecimal royaltyPercent) {
		this.royaltyPercent = royaltyPercent;
	}

	public BigDecimal getRoyaltyAmount() {
		return royaltyAmount;
	}

	public void setRoyaltyAmount(BigDecimal royaltyAmount) {
		this.royaltyAmount = royaltyAmount;
	}

	public Integer getRentDays() {
		return rentDays;
	}

	public void setRentDays(Integer rentDays) {
		this.rentDays = rentDays;
	}

	public LocalDateTime getRentStartDate() {
		return rentStartDate;
	}

	public void setRentStartDate(LocalDateTime rentStartDate) {
		this.rentStartDate = rentStartDate;
	}

	public LocalDateTime getRentEndDate() {
		return rentEndDate;
	}

	public void setRentEndDate(LocalDateTime rentEndDate) {
		this.rentEndDate = rentEndDate;
	}

	public Invoice getInvoice() {
		return invoice;
	}

	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
	}

	public LocalDateTime getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
}
