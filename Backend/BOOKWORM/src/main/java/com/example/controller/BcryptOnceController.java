package com.example.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BcryptOnceController {

    private final PasswordEncoder passwordEncoder;

    public BcryptOnceController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/bcrypt")
    public String generate() {
        return passwordEncoder.encode("pass123");
    }
}
