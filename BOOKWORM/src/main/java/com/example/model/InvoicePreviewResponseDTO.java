package com.example.model;

import java.math.BigDecimal;
import java.util.List;

public class InvoicePreviewResponseDTO {

    private List<InvoicePreviewItemDTO> items;
    private BigDecimal subTotal;
    private BigDecimal tax;
    private BigDecimal grandTotal;
	public List<InvoicePreviewItemDTO> getItems() {
		return items;
	}
	public void setItems(List<InvoicePreviewItemDTO> items) {
		this.items = items;
	}
	public BigDecimal getSubTotal() {
		return subTotal;
	}
	public void setSubTotal(BigDecimal subTotal) {
		this.subTotal = subTotal;
	}
	public BigDecimal getTax() {
		return tax;
	}
	public void setTax(BigDecimal tax) {
		this.tax = tax;
	}
	public BigDecimal getGrandTotal() {
		return grandTotal;
	}
	public void setGrandTotal(BigDecimal grandTotal) {
		this.grandTotal = grandTotal;
	}

    // getters & setters
}

