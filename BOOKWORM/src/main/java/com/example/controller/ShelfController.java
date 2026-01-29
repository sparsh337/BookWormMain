package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.model.MyShelf;
import com.example.model.ShelfRequest;
import com.example.service.ShelfService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ShelfController {

	private final ShelfService shelfserv;

	public ShelfController(ShelfService shelfserv) {
		this.shelfserv = shelfserv;
	}

	// shelf
	@GetMapping("/shelf/{userId}")
	public List<MyShelf> getmyshelf(@PathVariable int userId) {
		return shelfserv.getmyshelf(userId);
	}

	@PostMapping("/shelf/add")
	public MyShelf addToShelf(@RequestBody ShelfRequest req) {
		return shelfserv.addToShelf(
				req.getProductId(),
				req.getUserId(),
				req.getTranType(),
				req.getRentDays());
	}

	@GetMapping("/shelf")
	public List<MyShelf> getAllShelfItems() {
		return shelfserv.getAllShelfItems();
	}

	@DeleteMapping("/shelf/remove")
	public String removeFromShelf(
			@RequestParam int userId,
			@RequestParam int productId,
			@RequestParam char tranType) {

		shelfserv.removeFromShelf(userId, productId, tranType);
		return "Removed Successfully";
	}

	@DeleteMapping("/shelf/id/{shelfId}")
	public String removeById(@PathVariable int shelfId) {
		shelfserv.removeById(shelfId);
		return "Removed Successfully";
	}
}
