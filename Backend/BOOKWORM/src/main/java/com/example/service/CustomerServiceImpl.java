package com.example.service;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.model.Customer;
import com.example.model.RegisterRequest;
import com.example.repository.RegistrationRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final RegistrationRepository repository;
    private final PasswordEncoder passwordEncoder;

    public CustomerServiceImpl(RegistrationRepository repository,
                               PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void register(RegisterRequest request) {

        if (repository.existsByUserMail(request.getUserMail())) {
            throw new RuntimeException("Email already exists");
        }

        Customer customer = new Customer();
        customer.setUserName(request.getUserName());
        customer.setUserMail(request.getUserMail());

        // 🔐 HASH PASSWORD (CORRECT PLACE)
        customer.setPassword(
            passwordEncoder.encode(request.getPassword())
        );

        customer.setPhoneNo(request.getPhoneNo());
        customer.setProfileImage(request.getProfileImage());

        repository.save(customer);
    }

    @Override
    public List<Customer> getAllRegisteredUsers() {
        return repository.findAll();
    }
}
