package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.SearchRequest;
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

@Slf4j
@Component
public class ProductRepositoryImpl implements ProductRepository {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public ProductRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Product> findAll() {
        return mongoTemplate.findAll(Product.class,"products");
    }

    @Override
    public Integer save(Product product) {
        log.info("save");
        Product result = mongoTemplate.save(product, "products");
        return 1;
    }

    @Override
    public DynamicReport<Product> search(SearchRequest req) {
        Query query = new Query();

        // Apply filters based on the request parameters

        if (req.getQuery() != null && !req.getQuery().isEmpty()) {
            Criteria nameCriteria = Criteria.where("name").regex(req.getQuery(), "i");
            Criteria usernameCriteria = Criteria.where("sku").regex(req.getQuery(), "i");
            Criteria emailCriteria = Criteria.where("keywords").regex(req.getQuery(), "i");
            query.addCriteria(new Criteria().orOperator(nameCriteria, usernameCriteria, emailCriteria));
        }

        if (req.getBrandFilter() != null) {
            query.addCriteria(Criteria.where("brand").regex(req.getQuery(), "i"));
        }

        int page = (req.getPage() != null) ? req.getPage() - 1 : 0;
        Pageable pageable = PageRequest.of(page, 10);

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        List<Product> list = mongoTemplate.find(query.with(pageable).with(sort), Product.class, "products");
        long totalCustomers = mongoTemplate.count(query, Customer.class);
        int totalPages = (int) Math.ceil((double) totalCustomers / 10);

        // Create DynamicReport object with the data and the total number of pages
        return DynamicReport.<Product>builder()
                .data(list)
                .totalPages(totalPages)
                .build();
    }
}
