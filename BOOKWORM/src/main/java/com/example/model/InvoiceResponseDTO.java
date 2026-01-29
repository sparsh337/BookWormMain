package com.example.model;

import java.util.List;
import com.example.model.Invoice;
import com.example.model.InvoiceDetail;

public class InvoiceResponseDTO {

    private Invoice invoice;
    private List<InvoiceDetail> invoiceDetails;

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    public List<InvoiceDetail> getInvoiceDetails() {
        return invoiceDetails;
    }

    public void setInvoiceDetails(List<InvoiceDetail> invoiceDetails) {
        this.invoiceDetails = invoiceDetails;
    }
}
