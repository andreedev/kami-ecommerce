package com.example.demo.repository;

import com.example.demo.model.Order;
import com.example.demo.model.Product;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.ProductReportRequest;
import com.example.demo.model.validation.ReportRequest;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Slf4j
@Component
public class OrderRepositoryImpl implements OrderRepository {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public OrderRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public DynamicReport<Order> report(ReportRequest req) throws ParseException {
        Query query = new Query();

        if (req.getStatusFilter() != null && !req.getStatusFilter().isEmpty()) {
            query.addCriteria(Criteria.where("status").is(req.getStatusFilter()));
        }

        if (req.getQuery() != null && !req.getQuery().isEmpty()) {
            query.addCriteria(new Criteria().orOperator(
                    Criteria.where("id").is(req.getQuery()),
                    Criteria.where("customerId").regex(req.getQuery(), "i"),
                    Criteria.where("orderNumber").regex(req.getQuery(), "i"),
                    Criteria.where("total").regex(req.getQuery(), "i")
            ));
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate startDate = LocalDate.parse(req.getDateFilter().getStartDate(), formatter);
        LocalDate endDate = LocalDate.parse(req.getDateFilter().getEndDate(), formatter);
        query.addCriteria(Criteria.where("createdAt").gte(startDate.atStartOfDay()).lte(endDate.atTime(LocalTime.MAX)));

        int page = (req.getPage() != null) ? req.getPage() - 1 : 0;
        Pageable pageable = PageRequest.of(page, 10);

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Order> list = mongoTemplate.find(query.with(pageable).with(sort), Order.class, "orders");
        long totalCustomers = mongoTemplate.count(query.skip(0).limit(0), Order.class, "orders");
        int totalPages = (int) Math.ceil((double) totalCustomers / 20);

        return DynamicReport.<Order>builder()
                .data(list)
                .totalPages(totalPages)
                .build();
    }

    @Override
    public Integer update(Order order) {
        Query query = new Query(Criteria.where("id").is(order.getId()));
        Update update = new Update();
        update.set("status", order.getStatus());
        UpdateResult result = mongoTemplate.updateFirst(query, update, Order.class);
        return (int) result.getModifiedCount();
    }
}
