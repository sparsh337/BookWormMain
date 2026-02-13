package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.RoyaltyTransaction;

public interface RoyaltyTransactionRepository extends JpaRepository<RoyaltyTransaction, Integer> {

        // user wise royalty transactions (who purchased/rented)
        List<RoyaltyTransaction> findByUserId(int userId);

        // product wise royalty transactions
        List<RoyaltyTransaction> findByProductProductId(int productId);

        // author wise royalty transactions (who receives royalty)
        List<RoyaltyTransaction> findByAuthorAuthorId(Integer authorId);

        // purchase / rent filter
        List<RoyaltyTransaction> findByTranType(char tranType);
}
