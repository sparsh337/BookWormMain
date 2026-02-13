package com.example.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class AuthorProductId implements Serializable {

    @Column(name = "author_id")
    private Integer authorId;

    @Column(name = "product_id")
    private Integer productId;

    public AuthorProductId() {}

    public AuthorProductId(Integer authorId, Integer productId) {
        this.authorId = authorId;
        this.productId = productId;
    }

    public Integer getAuthorId() { return authorId; }
    public void setAuthorId(Integer authorId) { this.authorId = authorId; }

    public Integer getProductId() { return productId; }
    public void setProductId(Integer productId) { this.productId = productId; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AuthorProductId)) return false;
        AuthorProductId that = (AuthorProductId) o;
        return Objects.equals(authorId, that.authorId) &&
               Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(authorId, productId);
    }
}
