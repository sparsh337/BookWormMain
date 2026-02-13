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

        public void generateRoyalty(int userId, Product product, char tranType, BigDecimal salePrice,
                        BigDecimal basePrice,
                        int quantity, Integer rentDays, com.example.model.Invoice invoice) {

                // only for Purchase / Rent / Library
                if (!(tranType == 'P' || tranType == 'R' || tranType == 'L'))
                        return;

                BigDecimal percent;
                if (tranType == 'P') {
                        percent = new BigDecimal("10");
                } else if (tranType == 'R') {
                        percent = new BigDecimal("5");
                } else {
                        // 'L' -> Library
                        percent = new BigDecimal("2");
                }

                BigDecimal totalRoyalty = salePrice.multiply(percent).divide(new BigDecimal("100"));

                int authorCount = product.getAuthors().size();
                if (authorCount == 0)
                        return;

                BigDecimal perAuthorRoyalty = totalRoyalty.divide(new BigDecimal(authorCount), 2,
                                java.math.RoundingMode.HALF_UP);

                LocalDateTime now = LocalDateTime.now();

                for (Author author : product.getAuthors()) {

                        RoyaltyTransaction rt = new RoyaltyTransaction();
                        rt.setUserId(userId);
                        rt.setProduct(product);
                        rt.setAuthor(author);
                        rt.setTranType(tranType);

                        rt.setQuantity(quantity);
                        rt.setSalePrice(salePrice);
                        rt.setBasePrice(basePrice);

                        rt.setRoyaltyPercent(percent);
                        rt.setRoyaltyAmount(perAuthorRoyalty);

                        if (tranType == 'P') {
                                rt.setRentDays(null);
                                rt.setRentStartDate(null);
                                rt.setRentEndDate(null);
                        } else {
                                rt.setRentDays(rentDays);
                                rt.setRentStartDate(now);
                                // Calculate end date: start date + rent days (default to 0 if null)
                                int effectiveRentDays = (rentDays != null) ? rentDays : 0;
                                rt.setRentEndDate(now.plusDays(effectiveRentDays));
                        }

                        rt.setInvoice(invoice);
                        rt.setTransactionDate(now);

                        String remark = "Royalty for " + (tranType == 'P' ? "Purchase"
                                        : (tranType == 'R' ? "Rent" : "Library Access"));
                        rt.setRemarks(remark);

                        royaltyRepo.save(rt);
                }
        }
}
