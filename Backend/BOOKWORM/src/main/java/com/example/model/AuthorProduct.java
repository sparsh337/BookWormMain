package com.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "product_author")
public class AuthorProduct {

    @EmbeddedId
    private AuthorProductId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("authorId")
    @JoinColumn(name = "author_id")
    private Author author;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    public AuthorProduct() {}

    public AuthorProduct(Author author, Product product) {
        this.author = author;
        this.product = product;
        this.id = new AuthorProductId(
            author.getAuthorId(),
            product.getProductId()
        );
    }

    public AuthorProductId getId() { return id; }
    public void setId(AuthorProductId id) { this.id = id; }

    public Author getAuthor() { return author; }
    public void setAuthor(Author author) { this.author = author; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
}
