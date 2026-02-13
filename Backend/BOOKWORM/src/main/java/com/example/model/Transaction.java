package com.example.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transaction_master")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "txn_id")
    private Integer txnId;

    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(name = "txn_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal txnAmount;

    @Column(name = "txn_type", length = 1, nullable = false)
    private String txnType; // P / R / L

    @Column(name = "payment_mode", length = 20, nullable = false)
    private String paymentMode; // UPI / CARD / CASH

    @Column(name = "txn_status", length = 20, nullable = false)
    private String txnStatus; // SUCCESS / FAILED / PENDING

    @Column(name = "txn_date")
    private LocalDateTime txnDate;

    @PrePersist
    protected void onCreate() {
        this.txnDate = LocalDateTime.now();
    }

    // ========= Getters & Setters =========

    public Integer getTxnId() {
        return txnId;
    }

    public void setTxnId(Integer txnId) {
        this.txnId = txnId;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public BigDecimal getTxnAmount() {
        return txnAmount;
    }

    public void setTxnAmount(BigDecimal txnAmount) {
        this.txnAmount = txnAmount;
    }

    public String getTxnType() {
        return txnType;
    }

    public void setTxnType(String txnType) {
        this.txnType = txnType;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getTxnStatus() {
        return txnStatus;
    }

    public void setTxnStatus(String txnStatus) {
        this.txnStatus = txnStatus;
    }

    public LocalDateTime getTxnDate() {
        return txnDate;
    }
}
