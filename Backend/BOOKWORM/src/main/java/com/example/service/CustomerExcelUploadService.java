package com.example.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.model.Customer;
import com.example.repository.CustomerRepository;

@Service
public class CustomerExcelUploadService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerExcelUploadService(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void uploadCustomers(MultipartFile file) {

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {

            Sheet sheet = workbook.getSheetAt(0);
            List<Customer> customers = new ArrayList<>();

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {

                Row row = sheet.getRow(i);
                if (row == null)
                    continue;

                String name = getCellValue(row.getCell(0));
                String email = getCellValue(row.getCell(1));
                String password = getCellValue(row.getCell(2));
                String phone = getCellValue(row.getCell(3));

                if (email == null || email.isBlank()) {
                    continue;
                }

                if (customerRepository.existsByUserMail(email)) {
                    continue;
                }

                Customer customer = new Customer();
                customer.setUserName(name);
                customer.setUserMail(email);
                // Hash the password if present, otherwise set a default hashed password
                if (password != null && !password.isBlank()) {
                    customer.setPassword(passwordEncoder.encode(password));
                } else {
                    customer.setPassword(passwordEncoder.encode("defaultPassword123"));
                }

                customer.setPhoneNo(phone);

                customers.add(customer);
            }

            customerRepository.saveAll(customers);

        } catch (Exception e) {
            throw new RuntimeException("Failed to upload customers from Excel", e);
        }
    }

    /**
     * 🔥 SAFE cell reader (handles STRING + NUMERIC)
     */
    private String getCellValue(Cell cell) {
        if (cell == null)
            return null;

        switch (cell.getCellType()) {

            case STRING:
                return cell.getStringCellValue().trim();

            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getLocalDateTimeCellValue().toString();
                }
                return String.valueOf((long) cell.getNumericCellValue());

            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());

            default:
                return null;
        }
    }
}
