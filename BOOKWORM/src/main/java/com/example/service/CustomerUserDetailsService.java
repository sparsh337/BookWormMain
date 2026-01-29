package com.example.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.model.Customer;
import com.example.repository.RegistrationRepository;

@Service
public class CustomerUserDetailsService implements UserDetailsService {

    private final RegistrationRepository repository;

    public CustomerUserDetailsService(RegistrationRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        Customer customer = repository.findByUserMail(email)
                .orElseThrow(()
                        -> new UsernameNotFoundException("User not found"));

        // Convert Customer → Spring Security UserDetails
        return org.springframework.security.core.userdetails.User
                .withUsername(customer.getUserMail())
                .password(customer.getPassword()) // bcrypt hash
                .roles("USER")
                .build();
    }
}
