package com.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "beneficiary_master")
public class Beneficiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ben_id")
    private int benId;

    @Column(name = "ben_name", length = 100, nullable = false)
    private String benName;

    @Column(name = "ben_email", length = 100, unique = true)
    private String emailId;

    @Column(name = "ben_contact_no", length = 15)
    private String contactNo;

    @Column(name = "bank_name", length = 100, nullable = false)
    private String bankName;

    @Column(name = "bank_branch", length = 100)
    private String bankBranch;

    @Column(name = "ifsc", length = 15, nullable = false)
    private String ifsc;

    @Column(name = "account_no", length = 20, nullable = false)
    private String accountNo;

    @Column(name = "account_type", length = 20)
    private String accountType;

    @Column(name = "pan", length = 10, unique = true)
    private String pan;

    // Getters & Setters
    public int getBenId() { return benId; }
    public void setBenId(int benId) { this.benId = benId; }

    public String getBenName() { return benName; }
    public void setBenName(String benName) { this.benName = benName; }

    public String getEmailId() { return emailId; }
    public void setEmailId(String emailId) { this.emailId = emailId; }

    public String getContactNo() { return contactNo; }
    public void setContactNo(String contactNo) { this.contactNo = contactNo; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getBankBranch() { return bankBranch; }
    public void setBankBranch(String bankBranch) { this.bankBranch = bankBranch; }

    public String getIfsc() { return ifsc; }
    public void setIfsc(String ifsc) { this.ifsc = ifsc; }

    public String getAccountNo() { return accountNo; }
    public void setAccountNo(String accountNo) { this.accountNo = accountNo; }

    public String getAccountType() { return accountType; }
    public void setAccountType(String accountType) { this.accountType = accountType; }

    public String getPan() { return pan; }
    public void setPan(String pan) { this.pan = pan; }
}

