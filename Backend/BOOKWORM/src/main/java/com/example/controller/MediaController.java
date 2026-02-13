package com.example.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Customer;
import com.example.model.MyShelf;
import com.example.model.Product;
import com.example.repository.CustomerRepository;
import com.example.repository.ProductRepository;
import com.example.repository.ShelfRepository;

@RestController
@RequestMapping("/api/media")
@CrossOrigin(origins = "*")
public class MediaController {

    private final CustomerRepository customerRepo;
    private final ShelfRepository shelfRepo;
    private final ProductRepository productRepo;

    @org.springframework.beans.factory.annotation.Value("${bookworm.media.path}")
    private String mediaBasePath;

    public MediaController(CustomerRepository customerRepo, ShelfRepository shelfRepo, ProductRepository productRepo) {
        this.customerRepo = customerRepo;
        this.shelfRepo = shelfRepo;
        this.productRepo = productRepo;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Resource> getMedia(@PathVariable int productId) throws IOException {
        // 1. Get current user username from JWT
        String principal = SecurityContextHolder.getContext().getAuthentication().getName();

        // Try finding by email first (standard subject in this app)
        Optional<Customer> customer = customerRepo.findByUserMail(principal);
        if (customer.isEmpty()) {
            // Fallback to username
            customer = customerRepo.findByUserName(principal);
        }

        if (customer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        int userId = customer.get().getUserId();

        // 2. Verify ownership/active rent/library access
        List<MyShelf> items = shelfRepo.findByUserIdAndProductProductId(userId, productId);
        LocalDate today = LocalDate.now();

        boolean canAccess = items.stream().anyMatch(item -> {
            if (item.getTranType() == 'P')
                return true;
            return item.getProductExpiryDate() != null && !item.getProductExpiryDate().isBefore(today);
        });

        if (!canAccess) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        // 3. Get product to determine type and name
        Optional<Product> productOpt = productRepo.findById(productId);
        if (productOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = productOpt.get();
        String type = product.getProductType().getTypeDesc(); // "EBOOK" or "AUDIOBOOK"
        String name = product.getProductName().trim();
        System.out.println("Serving Media for Product: '" + name + "'"); // DEBUG

        // 4. Resolve file path using the externalized mediaBasePath
        Path rootPath = Paths.get(mediaBasePath).toAbsolutePath();
        Path ebookPath = rootPath.resolve("ebooks").resolve(name + ".pdf");
        Path audioPath = rootPath.resolve("audiobooks").resolve(name + ".mp3");

        Path targetPath;
        String contentType;

        if ("EBOOK".equalsIgnoreCase(type)) {
            targetPath = ebookPath;
            contentType = "application/pdf";
        } else if ("AUDIOBOOK".equalsIgnoreCase(type)) {
            targetPath = audioPath;
            contentType = "audio/mpeg";
        } else {
            return ResponseEntity.badRequest().build();
        }

        System.out.println("Looking for file at: " + targetPath); // DEBUG
        System.out.println("File exists: " + Files.exists(targetPath)); // DEBUG

        if (!Files.exists(targetPath)) {
            // Fallback: check if the filename exists without extension or with different
            // case
            System.err.println("FILE NOT FOUND: " + targetPath);
            return ResponseEntity.notFound().build();
        }

        Resource resource = new UrlResource(targetPath.toUri());
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + name + "\"")
                .body(resource);
    }
}
