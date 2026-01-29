package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.model.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {

    @Query("SELECT DISTINCT g FROM Genre g ORDER BY g.genreDesc")
    List<Genre> findAllGenres();
}

