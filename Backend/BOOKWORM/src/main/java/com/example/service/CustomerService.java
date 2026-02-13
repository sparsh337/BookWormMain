package com.example.service;

import java.util.List;

import com.example.model.Customer;
import com.example.model.RegisterRequest;

public interface CustomerService {

    void register(RegisterRequest request);

    List<Customer> getAllRegisteredUsers();
}
