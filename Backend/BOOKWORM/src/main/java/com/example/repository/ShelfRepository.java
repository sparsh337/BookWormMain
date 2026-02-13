package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.model.UserLibrarySubscription;

import com.example.model.MyShelf;

public interface ShelfRepository extends JpaRepository<MyShelf, Integer> {
	List<MyShelf> findByUserIdAndTranType(int userId, char tranType);

	List<MyShelf> findByUserIdAndTranTypeIn(int userId, List<Character> tranTypes);

	boolean existsByUserIdAndProductProductIdAndTranType(
			int userId,
			int productId,
			char tranType);

	List<MyShelf> findByUserIdAndProductProductIdAndTranType(int userId, int productId, char tranType);

	public List<MyShelf> findByTranTypeIn(List<Character> of);

	void deleteByUserIdAndTranType(int userId, char tranType);

	List<MyShelf> findByUserIdAndProductProductId(int userId, int productId);

	@Query("SELECT s FROM UserLibrarySubscription s WHERE s.customer.userId = :userId AND s.active = true")
	UserLibrarySubscription findSubscriptionByUserId(int userId);
}
