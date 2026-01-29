package com.example.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.model.Author;
import com.example.model.Product;
import com.example.model.RoyaltyTransaction;
import com.example.repository.RoyaltyTransactionRepository;

@Service
public class RoyaltyTransactionService {

        private final RoyaltyTransactionRepository royaltyRepo;

        public RoyaltyTransactionService(RoyaltyTransactionRepository royaltyRepo) {
                this.royaltyRepo = royaltyRepo;
        }

        public void generateRoyalty(int userId, Product product, char tranType, BigDecimal amount) {

                // only for Purchase / Rent
                // only for Purchase / Rent / Library
                if (!(tranType == 'P' || tranType == 'R' || tranType == 'L'))
                        return;

                // Purchase = 10%, Rent = 5%
                BigDecimal percent = (tranType == 'P') ? new BigDecimal("10") : new BigDecimal("5");

                BigDecimal totalRoyalty = amount.multiply(percent).divide(new BigDecimal("100"));

                int authorCount = product.getAuthors().size();
                if (authorCount == 0)
                        return;

                BigDecimal perAuthorRoyalty = totalRoyalty.divide(new BigDecimal(authorCount));

                for (Author author : product.getAuthors()) {

                        RoyaltyTransaction rt = new RoyaltyTransaction();
                        rt.setUserId(userId);
                        rt.setProduct(product);
                        rt.setAuthor(author);
                        rt.setTranType(tranType);

                        rt.setSalePrice(amount);
                        rt.setRoyaltyPercent(percent);
                        rt.setRoyaltyAmount(perAuthorRoyalty);

                        rt.setTransactionDate(LocalDateTime.now());
                        rt.setRemarks("Auto royalty generated");

                        royaltyRepo.save(rt);
                }
        }
}
