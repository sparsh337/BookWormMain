package com.example.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.model.MyShelf;
import com.example.model.ShelfRequest;
import com.example.service.ShelfService;

@RestController
@RequestMapping("/api/library")
@CrossOrigin(origins = "*")
public class LibraryController {

	private final ShelfService shelfserv;

	public LibraryController(ShelfService shelfserv) {
		this.shelfserv = shelfserv;
	}

	// library
	@GetMapping("/{userId}")
	public List<MyShelf> getmylibrary(@PathVariable int userId) {
		return shelfserv.getmylibrary(userId);
	}

	@PostMapping("/add")
	public MyShelf addToLibrary(@RequestBody ShelfRequest req) {
		return shelfserv.addToShelf(
				req.getProductId(),
				req.getUserId(),
				req.getTranType(), // 'L' or 'R'
				req.getRentDays());
	}

	@GetMapping
	public List<MyShelf> getAllLibraryItems() {
		return shelfserv.getAllLibraryItems();
	}

	@DeleteMapping("/remove")
	public String removeFromLibrary(
			@RequestParam int userId,
			@RequestParam int productId,
			@RequestParam char tranType) {
		shelfserv.removeFromShelf(userId, productId, tranType);
		return "Removed Successfully";
	}

	@DeleteMapping("/id/{shelfId}")
	public String removeById(@PathVariable int shelfId) {
		shelfserv.removeById(shelfId);
		return "Removed Successfully";
	}

	@PostMapping("/lend")
	public String lendFromLibrary(@RequestBody ShelfRequest req) {

		shelfserv.lendFromSubscription(
				req.getUserId(),
				req.getProductId());

		return "Book added via library subscription";
	}
}
