package com.example.service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

import com.example.model.Customer;
import com.example.model.Invoice;
import com.example.model.InvoiceDetail;
import com.example.repository.CustomerRepository;
import org.springframework.core.io.ClassPathResource;
import java.io.InputStream;

@Service
public class InvoicePdfServiceImpl implements InvoicePdfService {

        @Autowired
        private CustomerRepository customerRepository;

        @Override
        public byte[] generateInvoicePdf(Invoice invoice, List<InvoiceDetail> details) {

                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

                try {
                        PdfWriter writer = new PdfWriter(outputStream);
                        PdfDocument pdf = new PdfDocument(writer);
                        Document document = new Document(pdf);

                        // Define Colors
                        DeviceRgb themeColor = new DeviceRgb(51, 102, 204); // Navy Blue
                        DeviceRgb greyColor = new DeviceRgb(240, 240, 240); // Light Grey

                        // ======================
                        // HEADER SECTION
                        // ======================
                        Table headerTable = new Table(new float[] { 1, 1 });
                        headerTable.setWidth(UnitValue.createPercentValue(100));

                        // Left: Company Info
                        Cell companyCell = new Cell().setBorder(Border.NO_BORDER);

                        try {
                                InputStream is = new ClassPathResource("images/logo.png").getInputStream();
                                byte[] bytes = is.readAllBytes();
                                ImageData data = ImageDataFactory.create(bytes);
                                Image img = new Image(data);
                                img.setWidth(150); // Increased width for better visibility
                                companyCell.add(img);
                        } catch (Exception e) {
                                // Fallback to text if image fails to load
                                companyCell.add(new Paragraph("BookWorm")
                                                .setFontSize(26)
                                                .setBold()
                                                .setFontColor(themeColor));
                        }

                        companyCell.add(new Paragraph("Your Gateway to Knowledge")
                                        .setFontSize(10)
                                        .setItalic()
                                        .setMarginTop(5));
                        companyCell.add(new Paragraph("123 Library Lane, Reading City, RC 54321")
                                        .setFontSize(9));
                        companyCell.add(new Paragraph("support@bookworm.com | +1 555-0123")
                                        .setFontSize(9));

                        // Right: Invoice Info
                        Cell invoiceInfoCell = new Cell().setBorder(Border.NO_BORDER)
                                        .setTextAlignment(TextAlignment.RIGHT);
                        invoiceInfoCell.add(new Paragraph("INVOICE")
                                        .setFontSize(24)
                                        .setBold()
                                        .setFontColor(ColorConstants.GRAY));
                        invoiceInfoCell.add(new Paragraph("# INV-" + invoice.getInvoiceId())
                                        .setFontSize(12)
                                        .setBold());
                        invoiceInfoCell.add(new Paragraph("Date: " + invoice.getInvoiceDate())
                                        .setFontSize(10));

                        headerTable.addCell(companyCell);
                        headerTable.addCell(invoiceInfoCell);
                        document.add(headerTable);

                        document.add(new Paragraph("\n")); // Spacer

                        // ======================
                        // CUSTOMER SECTION
                        // ======================
                        // Fetch Customer Details
                        Optional<Customer> customerOpt = customerRepository.findById(invoice.getUserId());
                        String customerName = "Guest";
                        String customerEmail = "-";
                        String customerPhone = "-";

                        if (customerOpt.isPresent()) {
                                Customer c = customerOpt.get();
                                customerName = c.getUserName();
                                customerEmail = c.getUserMail();
                                customerPhone = c.getPhoneNo() != null ? c.getPhoneNo() : "-";
                        }

                        Table customerTable = new Table(new float[] { 1, 1 });
                        customerTable.setWidth(UnitValue.createPercentValue(100));

                        Cell billToCell = new Cell().setBorder(Border.NO_BORDER);
                        billToCell.add(new Paragraph("Billed To:")
                                        .setBold()
                                        .setFontColor(themeColor));
                        billToCell.add(new Paragraph(customerName)
                                        .setBold()
                                        .setFontSize(11));
                        billToCell.add(new Paragraph(customerEmail).setFontSize(10));
                        billToCell.add(new Paragraph(customerPhone).setFontSize(10));

                        // Empty right cell or Ship To (keeping empty for now for digital goods)
                        Cell rightParams = new Cell().setBorder(Border.NO_BORDER);

                        customerTable.addCell(billToCell);
                        customerTable.addCell(rightParams);
                        document.add(customerTable);

                        document.add(new Paragraph("\n")); // Spacer

                        // ======================
                        // ITEMS TABLE
                        // ======================
                        // Columns: #, Description, Type, Qty, Unit Price, Total
                        float[] columnWidths = { 1, 5, 2, 1, 2, 2 };
                        Table itemTable = new Table(columnWidths);
                        itemTable.setWidth(UnitValue.createPercentValue(100));

                        // Headers
                        String[] headers = { "#", "Description", "Type", "Qty", "Unit Price", "Total" };
                        for (String header : headers) {
                                itemTable.addHeaderCell(new Cell()
                                                .add(new Paragraph(header).setBold().setFontColor(ColorConstants.WHITE))
                                                .setBackgroundColor(themeColor)
                                                .setBorder(new SolidBorder(themeColor, 1))
                                                .setTextAlignment(TextAlignment.CENTER));
                        }

                        // Rows
                        int count = 1;
                        for (InvoiceDetail d : details) {
                                // Item Number
                                itemTable.addCell(
                                                new Cell().add(new Paragraph(String.valueOf(count++)))
                                                                .setTextAlignment(TextAlignment.CENTER));

                                // Description (Product Name + Author/Language)
                                String productName = d.getProductName();
                                if (productName == null || productName.trim().isEmpty()) {
                                        if (d.getProduct() != null)
                                                productName = d.getProduct().getProductName();
                                }

                                String desc = productName;
                                // Try to add author or language if available (Optional enhancement)
                                if (d.getProduct() != null && d.getProduct().getLanguage() != null) {
                                        desc += " (" + d.getProduct().getLanguage().getLanguageDesc() + ")";
                                }

                                itemTable.addCell(new Cell().add(new Paragraph(desc)));

                                // Type
                                char type = d.getTranType();
                                String typeStr = "Purchase";
                                if (type == 'R')
                                        typeStr = "Rent (" + d.getRentNoOfDays() + " days)";
                                else if (type == 'L')
                                        typeStr = "Library Plan";

                                itemTable.addCell(
                                                new Cell().add(new Paragraph(typeStr))
                                                                .setTextAlignment(TextAlignment.CENTER).setFontSize(9));

                                // Qty
                                itemTable.addCell(new Cell().add(new Paragraph(String.valueOf(d.getQuantity())))
                                                .setTextAlignment(TextAlignment.CENTER));

                                // Unit Price
                                String unitPrice = d.getSalePrice() != null ? "₹ " + d.getSalePrice() : "-";
                                // For Library Plan, price might be hidden or 0 in invoice details sometimes,
                                // but handled here
                                if (d.getSalePrice() == null && d.getBasePrice() != null)
                                        unitPrice = "₹ " + d.getBasePrice();

                                itemTable.addCell(new Cell().add(new Paragraph(unitPrice))
                                                .setTextAlignment(TextAlignment.RIGHT));

                                // Total (Qty * SalePrice)
                                // Assuming SalePrice is per unit. If not pre-calculated, we do it here.
                                // However, InvoiceDetail doesn't always strictly store row total, so we'll just
                                // show SalePrice for now as 'Total' implies line total.
                                // Ideally: Logic should use basePrice * qty if salePrice is unit price.
                                // Let's assume SalePrice is Unit Price for now and calculation was done
                                // elsewhere or just show Sale Price.
                                // Refined: usually SalePrice in DB is Unit Sale Price.

                                String rowTotal = "-";
                                if (d.getSalePrice() != null) {
                                        try {
                                                double total = d.getSalePrice().doubleValue() * d.getQuantity();
                                                rowTotal = String.format("₹ %.2f", total);
                                        } catch (Exception e) {
                                        }
                                }

                                itemTable.addCell(new Cell().add(new Paragraph(rowTotal))
                                                .setTextAlignment(TextAlignment.RIGHT));
                        }

                        document.add(itemTable);

                        // ======================
                        // TOTALS SECTION
                        // ======================
                        Table totalTable = new Table(new float[] { 4, 1 }); // Wide spacer, Total block
                        totalTable.setWidth(UnitValue.createPercentValue(100));
                        totalTable.setMarginTop(20);

                        // Left side (Thank you note)
                        Cell noteCell = new Cell().setBorder(Border.NO_BORDER);
                        noteCell.add(new Paragraph("Thank you for your business!")
                                        .setItalic()
                                        .setFontSize(10));
                        noteCell.add(new Paragraph("Terms & Conditions applied.")
                                        .setFontSize(8)
                                        .setFontColor(ColorConstants.GRAY));

                        // Right side (Calculations)
                        Cell summaryCell = new Cell().setBorder(Border.NO_BORDER);
                        summaryCell.add(new Paragraph("Grand Total")
                                        .setBold()
                                        .setFontColor(themeColor)
                                        .setTextAlignment(TextAlignment.RIGHT));
                        summaryCell.add(new Paragraph("₹ " + invoice.getInvoiceAmount())
                                        .setFontSize(14)
                                        .setBold()
                                        .setTextAlignment(TextAlignment.RIGHT));

                        totalTable.addCell(noteCell);
                        totalTable.addCell(summaryCell);

                        document.add(totalTable);

                        document.close();

                } catch (Exception e) {
                        e.printStackTrace();
                        return null; // Or throw custom exception
                }

                return outputStream.toByteArray();
        }
}
