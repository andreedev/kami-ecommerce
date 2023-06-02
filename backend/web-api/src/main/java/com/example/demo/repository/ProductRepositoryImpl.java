package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.SearchRequest;
import com.example.demo.utils.Enums;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.Decimal128;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
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
            Criteria brandCriteria = Criteria.where("brand").regex(req.getQuery(), "i");
            query.addCriteria(new Criteria().orOperator(nameCriteria, usernameCriteria, emailCriteria, brandCriteria));
        }

        if (req.getCategoriesFilter() != null && !req.getCategoriesFilter().isEmpty()) {
            query.addCriteria(Criteria.where("categories").all(req.getCategoriesFilter()));
        }

        if (req.getMaxPriceFilter() != null && req.getMaxPriceFilter().compareTo(BigDecimal.valueOf(1991))<=0) {
            //Decimal128.parse( req.getMaxPriceFilter().toString()))
            query.addCriteria(Criteria.where("price").lte(req.getMaxPriceFilter()));
        }

        if (req.getInStockFilter() != null && req.getInStockFilter()){
            query.addCriteria(Criteria.where("stock").gte( 1 ));
        }

        if (req.getBrandFilter() != null && !req.getBrandFilter().isEmpty()) {
             query.addCriteria(Criteria.where("brand").regex(req.getBrandFilter(), "i"));
        }

        int page = req.getPage() - 1;
        Pageable pageable = PageRequest.of(page, req.getPageSize());

        Sort sort = null;
        if (req.getOrderFilter() == Enums.SearchRequestOrderFilter.DEFAULT.getCode()){
            sort = Sort.by(Sort.Direction.DESC, "createdAt");
        } else if (req.getOrderFilter() == Enums.SearchRequestOrderFilter.LOWEST_PRICE.getCode()){
             sort = Sort.by(Sort.Direction.ASC, "price");
        } else if (req.getOrderFilter() == Enums.SearchRequestOrderFilter.HIGHEST_PRICE.getCode()){
             sort = Sort.by(Sort.Direction.DESC, "price");
        } else if (req.getOrderFilter() == Enums.SearchRequestOrderFilter.RECOMMENDED.getCode()){
             sort = Sort.by(Sort.Direction.ASC, "stock");
        } else if (req.getOrderFilter() == Enums.SearchRequestOrderFilter.ALPHABETICAL.getCode()){
             sort = Sort.by(Sort.Direction.ASC, "name");
        }

        if (req.getOnSaleFilter() != null && req.getOnSaleFilter()) {
            LocalDateTime now = LocalDateTime.now();
//            ZoneId universalZone = ZoneId.of("UTC");
//            Instant currentInstant = now.atZone(universalZone).toInstant();

            Criteria discountExistsCriteria = Criteria.where("discount").exists(true);
            Criteria startDateCriteria = Criteria.where("discount.startDate").lte(now);
            Criteria endDateCriteria = Criteria.where("discount.endDate").gte(now);

            query.addCriteria(discountExistsCriteria);
            query.addCriteria(startDateCriteria);
            query.addCriteria(endDateCriteria);
        }

        query.addCriteria(Criteria.where("status").is(Enums.ProductStatus.PUBLISHED.getCode()));

        List<Product> list = mongoTemplate.find(query.with(pageable).with(sort), Product.class, "products");
        long totalCustomers = mongoTemplate.count(query, Customer.class);
        int totalPages = (int) Math.ceil((double) totalCustomers / 20);

        // Create DynamicReport object with the data and the total number of pages
        return DynamicReport.<Product>builder()
                .data(list)
                .totalPages(totalPages)
                .build();
    }
}
