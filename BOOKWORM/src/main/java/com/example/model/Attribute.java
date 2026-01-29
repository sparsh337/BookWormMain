package com.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "attribute_master")
public class Attribute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attribute_id")
    private int attributeId;

    @Column(name = "attribute_desc", length = 50, nullable = false, unique = true)
    private String attributeDesc;

    public int getAttributeId() {
        return attributeId;
    }
    public void setAttributeId(int attributeId) {
        this.attributeId = attributeId;
    }

    public String getAttributeDesc() {
        return attributeDesc;
    }
    public void setAttributeDesc(String attributeDesc) {
        this.attributeDesc = attributeDesc;
    }
}

