package com.example.demo.repository;

import com.example.demo.model.Category;
import com.example.demo.model.Customer;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.CategoryReportRequest;
import com.example.demo.model.validation.ProductReportRequest;
import com.mongodb.client.result.DeleteResult;
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
public class CategoryRepositoryImpl implements CategoryRepository {
    private final MongoTemplate mongoTemplate;
    @Autowired
    public CategoryRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public DynamicReport<Category> report(CategoryReportRequest req) throws ParseException {
        Query query = new Query();

        if (req.getQuery() != null && !req.getQuery().isEmpty()) {
            Criteria nameCriteria = Criteria.where("id").regex(req.getQuery(), "i");
            Criteria usernameCriteria = Criteria.where("name").regex(req.getQuery(), "i");
            query.addCriteria(new Criteria().orOperator(nameCriteria, usernameCriteria));
        }

        int page = (req.getPage() != null) ? req.getPage() - 1 : 0;
        Pageable pageable = PageRequest.of(page, 10);

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Category> list = mongoTemplate.find(query.with(pageable).with(sort), Category.class, "categories");
        long totalCustomers = mongoTemplate.count(query, Customer.class);
        int totalPages = (int) Math.ceil((double) totalCustomers / 10);

        // Create DynamicReport object with the data and the total number of pages
        return DynamicReport.<Category>builder()
                .data(list)
                .totalPages(totalPages)
                .build();
    }

    @Override
    public Category create(Category category) {
        log.info("createCategory");
        return mongoTemplate.save(category, "categories");
    }

    @Override
    public Integer update(Category category) {
        log.info("updateCategory");
        Query query = new Query(Criteria.where("name").is(category.getName()));
        Update update = new Update();
        update.set("name", category.getName());
        update.set("mediaUrl", category.getMediaUrl());
        UpdateResult result = mongoTemplate.updateFirst(query, update, Category.class);
        return (int) result.getModifiedCount();
    }

    @Override
    public Integer delete(Category category) {
        log.info("deleteCategory");
        Query query = new Query(Criteria.where("name").is(category.getName()));
        DeleteResult result = mongoTemplate.remove(query, Category.class);
        return (int) result.getDeletedCount();
    }

}
