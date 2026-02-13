package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.model.Language;

public interface LanguageRepository extends JpaRepository<Language, Long> {

    @Query("SELECT DISTINCT l FROM Language l ORDER BY l.languageDesc")
    List<Language> findAllLanguages();
}

