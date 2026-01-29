package com.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.model.InvoiceDetail;

@Repository
public interface InvoiceDetailRepository
        extends JpaRepository<InvoiceDetail, Integer> {

    @Query("""
		        SELECT d FROM InvoiceDetail d
		        JOIN FETCH d.product
		        WHERE d.invoice.invoiceId = :invoiceId
		    """)
    List<InvoiceDetail> findByInvoiceInvoiceId(Integer invoiceId);

}
