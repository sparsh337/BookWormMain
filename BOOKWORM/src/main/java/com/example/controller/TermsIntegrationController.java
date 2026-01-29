package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/terms")
public class TermsIntegrationController {

    private final RestTemplate restTemplate;

    public TermsIntegrationController() {
        this.restTemplate = new RestTemplate();
    }

    @GetMapping
    public ResponseEntity<?> getTermsFromDotNet() {
        String dotnetApiUrl = "http://localhost:5001/api/terms";
        try {
            // Fetching as Map to automatically handle JSON response
            Map response = restTemplate.getForObject(dotnetApiUrl, Map.class);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error connecting to .NET API: " + e.getMessage());
        }
    }
}
