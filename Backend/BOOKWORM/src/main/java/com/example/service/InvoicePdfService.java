package com.example.service;

import java.util.List;

import com.example.model.Invoice;
import com.example.model.InvoiceDetail;

public interface InvoicePdfService {
	byte[] generateInvoicePdf(Invoice invoice, List<InvoiceDetail> details);
}

