package services;

import com.example.model.Cart;
import com.example.model.LibraryPackage;
import com.example.model.Product;
import com.example.model.UserLibrarySubscription;
import com.example.repository.CartRepository;
import com.example.repository.ProductRepository;
import com.example.repository.UserLibrarySubscriptionRepository;
import com.example.service.CartService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

        @Mock
        private CartRepository cartRepository;

        @Mock
        private ProductRepository productRepository;

        @Mock
        private UserLibrarySubscriptionRepository subscriptionRepository;

        @InjectMocks
        private CartService cartService;

        @Test
        void addOrUpdateProduct_whenProductNotInCart() {

                // arrange
                when(cartRepository.findByCustomerUserIdAndProductProductId(1, 101))
                                .thenReturn(Optional.empty());

                // act
                Product p = new Product();
                p.setProductId(101);
                p.setLibrary(true); // Allow library
                when(productRepository.findById(101)).thenReturn(Optional.of(p));

                when(cartRepository.save(any(Cart.class)))
                                .thenAnswer(invocation -> invocation.getArgument(0));

                Cart result = cartService.addOrUpdateProduct(1, 101, 2, 'P', null);

                // assert
                assertNotNull(result);
                assertEquals(1, result.getQuantity());

                // verify repository interaction
                verify(cartRepository)
                                .save(any(Cart.class));
        }

        @Test
        void addOrUpdateProduct_whenTypeChangesFromRentToBuy() {
                // 1. Arrange existing 'R' item
                Cart existingRentItem = new Cart();
                existingRentItem.setTranType('R');
                existingRentItem.setQuantity(1);

                when(cartRepository.findByCustomerUserIdAndProductProductId(1, 101))
                                .thenReturn(Optional.of(existingRentItem));

                when(cartRepository.save(any(Cart.class)))
                                .thenAnswer(invocation -> invocation.getArgument(0));

                // 2. Act: Add 'P' (Buy)
                Cart result = cartService.addOrUpdateProduct(1, 101, 1, 'P', null);

                // 3. Assert: Type is 'P', Quantity is 1 (not 1+1=2)
                assertEquals('P', result.getTranType());
                assertEquals(1, result.getQuantity());
                assertNull(result.getRentDays());
        }

        @Test
        void addOrUpdateProduct_whenTypeChangesFromBuyToRent() {
                // 1. Arrange existing 'P' item
                Cart existingBuyItem = new Cart();
                existingBuyItem.setTranType('P');
                existingBuyItem.setQuantity(1);

                when(cartRepository.findByCustomerUserIdAndProductProductId(1, 101))
                                .thenReturn(Optional.of(existingBuyItem));

                when(cartRepository.save(any(Cart.class)))
                                .thenAnswer(invocation -> invocation.getArgument(0));

                // 2. Act: Add 'R' (Rent)
                Product p = new Product();
                p.setProductId(101);
                lenient().when(productRepository.findById(101)).thenReturn(Optional.of(p));

                Cart result = cartService.addOrUpdateProduct(1, 101, 1, 'R', 14);

                // 3. Assert: Type is now 'R' (Latest Click Wins), Quantity is 1
                assertEquals('R', result.getTranType());
                assertEquals(1, result.getQuantity());
                assertEquals(14, result.getRentDays());
        }

        @Test
        void addOrUpdateProduct_whenLibraryLimitReached_throwsException() {
                // 1. Arrange
                UserLibrarySubscription sub = new UserLibrarySubscription();
                LibraryPackage pkg = new LibraryPackage();
                pkg.setMaxSelectableBooks(5);
                sub.setLibraryPackage(pkg);
                sub.setBooksSelectedCount(5); // Already used 5/5

                when(subscriptionRepository.findByCustomerUserIdAndActiveTrue(1))
                                .thenReturn(sub);

                // 2. Act & Assert
                Product p = new Product();
                p.setProductId(101);
                p.setLibrary(true);
                when(productRepository.findById(101)).thenReturn(Optional.of(p));

                assertThrows(RuntimeException.class, () -> {
                        cartService.addOrUpdateProduct(1, 101, 1, 'L', 0);
                });
        }
}
