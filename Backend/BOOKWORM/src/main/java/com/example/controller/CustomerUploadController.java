package com.example.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.service.CustomerExcelUploadService;

@RestController
@RequestMapping("/api/customers")
public class CustomerUploadController {

    private final CustomerExcelUploadService uploadService;

    public CustomerUploadController(CustomerExcelUploadService uploadService) {
        this.uploadService = uploadService;
    }

    @PostMapping("/upload")
    public String uploadCustomers(@RequestParam("file") MultipartFile file) {
        uploadService.uploadCustomers(file);
        return "Customer Excel uploaded successfully";
    }
}
