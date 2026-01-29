
package com.example.model;
import jakarta.persistence.*;

@Entity
@Table(name = "product_type_master")
public class ProductType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private Integer typeId;

    @Column(name = "type_desc", length = 50, nullable = false, unique = true)
    private String typeDesc;

    public int getTypeId() {
        return typeId;
    }
    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public String getTypeDesc() {
        return typeDesc;
    }
    public void setTypeDesc(String typeDesc) {
        this.typeDesc = typeDesc;
    }
}
