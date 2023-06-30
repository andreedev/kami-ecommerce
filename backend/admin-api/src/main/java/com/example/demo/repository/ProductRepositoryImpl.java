package com.example.demo.repository;

import com.example.demo.model.Order;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.ProductReportRequest;
import com.example.demo.utils.Constants;
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
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Slf4j
@Component
public class ProductRepositoryImpl implements ProductRepository {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public ProductRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public DynamicReport<Product> getProductReport(ProductReportRequest req) throws ParseException {
        Query query = new Query();

        // Apply filters based on the request parameters
        if (req.getAvailabilityFilter() != null) {
            query.addCriteria(Criteria.where("isAvailable").is(req.getAvailabilityFilter()));
        }

        if (req.getQuery() != null && !req.getQuery().isEmpty()) {
            query.addCriteria(new Criteria().orOperator(
                Criteria.where("id").is(req.getQuery()),
                Criteria.where("name").regex(req.getQuery(), "i"),
                Criteria.where("sku").regex(req.getQuery(), "i"),
                Criteria.where("keywords").regex(req.getQuery(), "i")
            ));
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate startDate = LocalDate.parse(req.getDateFilter().getStartDate(), formatter);
        LocalDate endDate = LocalDate.parse(req.getDateFilter().getEndDate(), formatter);
        query.addCriteria(Criteria.where("createdAt").gte(startDate.atStartOfDay()).lte(endDate.atTime(LocalTime.MAX)));

        int page = req.getPage() - 1;
        Pageable pageable = PageRequest.of(page, Constants.PRODUCT_REPORT_PAGE_SIZE);

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Product> list = mongoTemplate.find(query.with(pageable).with(sort), Product.class, "products");

        long total = mongoTemplate.count(query.skip(0).limit(0), Product.class, "products");
        int totalPages = (int) Math.ceil((double) total / Constants.PRODUCT_REPORT_PAGE_SIZE);

        return DynamicReport.<Product>builder()
                .data(list)
                .totalPages(totalPages)
                .build();
    }

    @Override
    public Product getById(String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(id));
        return mongoTemplate.findOne(query, Product.class, "products");
    }

    @Override
    public boolean existsById(String id) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(id));
        return mongoTemplate.exists(query, Product.class);
    }

    @Override
    public boolean existsByName(String name) {
        Query query = new Query();
        query.addCriteria(
            new Criteria().orOperator(
                where("name").regex(name, "i")
            )
        );
        return mongoTemplate.exists(query, Product.class);
    }

    @Override
    public boolean existsBySku(String sku) {
        Query query = new Query();
        query.addCriteria(
            new Criteria().orOperator(
                where("sku").regex(sku)
            )
        );
        return mongoTemplate.exists(query, Product.class);
    }

    @Override
    public Product createProduct(Product product) {
        log.info("create");
        Product result = mongoTemplate.save(product, "products");
        return result;
    }

    @Override
    public Integer updateProduct(Product product) {
        Query query = new Query(Criteria.where("id").is(product.getId()));
        Update update = new Update();
        update.set("isAvailable", product.getIsAvailable());
        update.set("name", product.getName());
        update.set("sku", product.getSku());
        update.set("price", product.getPrice());
        update.set("discount", product.getDiscount());
        update.set("brand", product.getBrand());
        update.set("categories", product.getCategories());
        update.set("specifications", product.getSpecifications());
        update.set("mediaUrls", product.getMediaUrls());
        update.set("keywords", product.getKeywords());
        update.set("stock", product.getStock());
        UpdateResult result = mongoTemplate.updateFirst(query, update, Product.class);
        return (int) result.getModifiedCount();
    }
}
