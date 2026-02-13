package com.example.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.model.Invoice;
import com.example.model.Customer;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendInvoiceEmail(
            Customer customer,
            Invoice invoice,
            byte[] invoicePdf) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(customer.getUserMail());
            helper.setSubject("Bookworm - Order Confirmation & Invoice");

            String content = String.format(
                    "Hello %s,\n\n" +
                            "Your order has been placed successfully!\n\n" +
                            "Invoice ID: INV-%d\n" +
                            "Date: %s\n" +
                            "Total Amount: ₹%.2f\n\n" +
                            "Please find your digital invoice attached to this email.\n\n" +
                            "Happy Reading!\n" +
                            "Team Bookworm",
                    customer.getUserName(),
                    invoice.getInvoiceId(),
                    invoice.getInvoiceDate().toString(),
                    invoice.getInvoiceAmount());

            helper.setText(content, false);

            helper.addAttachment(
                    "Invoice_INV-" + invoice.getInvoiceId() + ".pdf",
                    new ByteArrayResource(invoicePdf));

            mailSender.send(message);
            System.out.println("Email sent successfully to: " + customer.getUserMail());

        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
