package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.CustomerReportRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static com.example.demo.utils.Constants.CUSTOMER_REPORT_PAGE_SIZE;

@Slf4j
@Component
public class CustomerRepositoryImpl implements CustomerRepository {
    private final MongoTemplate mongoTemplate;
    @Autowired
    public CustomerRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public DynamicReport<Customer> getCustomerReport(CustomerReportRequest req) {
        Query query = new Query();

        if (req.getStatusFilter() != null) {
            query.addCriteria(Criteria.where("status").is(req.getStatusFilter()));
        }

        if (req.getQuery() != null && !req.getQuery().isEmpty()) {
            query.addCriteria(new Criteria().orOperator(
                    Criteria.where("id").is(req.getQuery()),
                    Criteria.where("name").regex(req.getQuery(), "i"),
                    Criteria.where("username").regex(req.getQuery(), "i"),
                    Criteria.where("email").regex(req.getQuery(), "i"),
                    Criteria.where("documentNumber").regex(req.getQuery(), "i")
            ));
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate startDate = LocalDate.parse(req.getDateFilter().getStartDate(), formatter);
        LocalDate endDate = LocalDate.parse(req.getDateFilter().getEndDate(), formatter);
        query.addCriteria(Criteria.where("createdAt").gte(startDate.atStartOfDay()).lte(endDate.atTime(LocalTime.MAX)));

        int page = (req.getPage() != null) ? req.getPage() - 1 : 0;
        Pageable pageable = PageRequest.of(page, CUSTOMER_REPORT_PAGE_SIZE);

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Customer> customers = mongoTemplate.find(query.with(pageable).with(sort), Customer.class, "customers");
        long totalCustomers = mongoTemplate.count(query, Customer.class);
        int totalPages = (int) Math.ceil((double) totalCustomers / CUSTOMER_REPORT_PAGE_SIZE);

        return DynamicReport.<Customer>builder()
                .data(customers)
                .totalPages(totalPages)
                .build();
    }
}
