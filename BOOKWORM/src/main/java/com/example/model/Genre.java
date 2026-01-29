package com.example.model;

import jakarta.persistence.*;

@Entity
@Table(name = "genre_master")
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "genre_id")
    private Integer genreId;

    @Column(name = "genre_desc", length = 50, nullable = false)
    private String genreDesc;
    
    @ManyToOne
    @JoinColumn(name = "language_id")
    private Language language;

    public int getGenreId() {
        return genreId;
    }
    public void setGenreId(int genreId) {
        this.genreId = genreId;
    }

    public String getGenreDesc() {
        return genreDesc;
    }
    public void setGenreDesc(String genreDesc) {
        this.genreDesc = genreDesc;
    }

    public Language getLanguage() {
        return language;
    }
    public void setLanguage(Language language) {
        this.language = language;
    }
}

