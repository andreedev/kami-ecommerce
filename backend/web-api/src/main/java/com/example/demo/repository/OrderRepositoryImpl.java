package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.Order;
import com.example.demo.model.Product;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.SearchOrdersRequest;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Slf4j
@Component
public class OrderRepositoryImpl implements OrderRepository {
    private final MongoTemplate mongoTemplate;

    public OrderRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }
    @Override
    public Order create(Order order) {
        log.info("registerCustomer");
        Order result = mongoTemplate.save(order, "orders");
        return result;
    }

    @Override
    public DynamicReport<Order> searchOrders(Customer customer, SearchOrdersRequest req) {
        Query query = new Query();

        if (req.getStatusFilter() != null && !req.getStatusFilter().isEmpty()) {
            query.addCriteria(Criteria.where("status").is(req.getStatusFilter()));
        }

        if (req.getQuery() != null && !req.getQuery().isEmpty()) {
            Criteria nameCriteria = Criteria.where("orderNumber").regex(req.getQuery(), "i");
            Criteria usernameCriteria = Criteria.where("total").regex(req.getQuery(), "i");
            query.addCriteria(new Criteria().orOperator(nameCriteria, usernameCriteria));
        }

        query.addCriteria(where("customerId").is(customer.getId()));

        int page = req.getPage() - 1;
        Pageable pageable = PageRequest.of(page, 5);

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        query.with(pageable).with(sort);

        List<Order> list = mongoTemplate.find(query, Order.class, "orders");
        Stream<Order> orderStream = Streamable.of(list).stream();

        Page<Order> orderPage = PageableExecutionUtils.getPage(orderStream.collect(Collectors.toList()), pageable,
                () -> mongoTemplate.count(query.skip(0).limit(0), Order.class, "orders"));

        return DynamicReport.<Order>builder()
                .data(orderPage.getContent())
                .totalPages(orderPage.getTotalPages())
                .build();
    }

    @Override
    public Order findById(String id) {
        Query query = new Query(where("id").is(id));
        return mongoTemplate.findOne(query, Order.class, "orders");
    }

    @Override
    public boolean update(Order order) {
        Query query = new Query(Criteria.where("id").is(order.getId()));
        Update update = new Update()
                .set("status", order.getStatus())
                .set("payment.voucher", order.getPayment().getVoucher());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Order.class);
        return updateResult.getModifiedCount()==1;
    }

}
