package com.example.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.RoyaltyTransaction;
import com.example.repository.RoyaltyTransactionRepository;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final RoyaltyTransactionRepository royaltyTransactionRepository;

    public AdminController(RoyaltyTransactionRepository royaltyTransactionRepository) {
        this.royaltyTransactionRepository = royaltyTransactionRepository;
    }

    @GetMapping("/royalties")
    public ResponseEntity<List<RoyaltyTransaction>> getAllRoyalties() {
        List<RoyaltyTransaction> transactions = royaltyTransactionRepository.findAll();
        return ResponseEntity.ok(transactions);
    }
}
