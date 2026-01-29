package com.example.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.model.Customer;
import com.example.model.RegisterRequest;
import com.example.service.CustomerService;

@RestController
@RequestMapping("/api/register")
public class RegistrationController {

    private final CustomerService service;

    public RegistrationController(CustomerService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<String> registerUser(
            @Valid @RequestBody RegisterRequest request) {

        service.register(request);
        return ResponseEntity.ok("Registration successful");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Customer>> getAllUsers() {
        return ResponseEntity.ok(service.getAllRegisteredUsers());
    }
}
