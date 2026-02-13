package com.example.controller;


import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class HelloController {

    @GetMapping("/hello")
    public String hello(Authentication auth) {
        return "Hello " + auth.getName() + ", you accessed a protected resource!";
    }
}
