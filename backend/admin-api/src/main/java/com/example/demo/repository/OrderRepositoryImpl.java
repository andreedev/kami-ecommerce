package com.example.demo.repository;

import com.example.demo.model.Order;
import com.example.demo.model.Product;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.ProductReportRequest;
import com.example.demo.model.validation.ReportRequest;
import com.example.demo.model.validation.UpdateOrderStatusRequest;
import com.example.demo.utils.Enums;
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

import java.math.BigDecimal;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static com.example.demo.utils.Constants.ORDER_REPORT_PAGE_SIZE;
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
    public Order getById(String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));
        return mongoTemplate.findOne(query, Order.class, "orders");
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
        Pageable pageable = PageRequest.of(page, ORDER_REPORT_PAGE_SIZE);

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Order> list = mongoTemplate.find(query.with(pageable).with(sort), Order.class, "orders");
        long total = mongoTemplate.count(query.skip(0).limit(0), Order.class, "orders");
        int totalPages = (int) Math.ceil((double) total / ORDER_REPORT_PAGE_SIZE);

        return DynamicReport.<Order>builder()
                .data(list)
                .totalPages(totalPages)
                .build();
    }

    @Override
    public Integer updateOrderStatus(UpdateOrderStatusRequest req) {
        Query query = new Query(Criteria.where("id").is(req.getId()));
        query.addCriteria(where("status").ne(req.getNewStatus()));
        Update update = new Update();
        update.set("status", req.getNewStatus());
        if (req.getNewStatus().equals(Enums.OrderStatus.PAYMENT_CONFIRMED.getValue())){
            update.set("payment.totalPaid", req.getTotalPaid());
            if (req.getTotalRefunded()!=null && !req.getTotalRefunded().equals(BigDecimal.ZERO))
                update.set("payment.totalRefunded", req.getTotalRefunded());
        }
        UpdateResult result = mongoTemplate.updateFirst(query, update, Order.class);
        return (int) result.getModifiedCount();
    }


}
