package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.SearchRequest;
import com.example.demo.utils.Constants;
import com.example.demo.utils.Enums;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.demo.utils.Constants.PRODUCT_SEARCH_PAGE_SIZE;

@Slf4j
@Component
public class ProductRepositoryImpl implements ProductRepository {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public ProductRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public DynamicReport<Product> search(SearchRequest req) {
        Query query = new Query();

        if (req.getQuery() != null && !req.getQuery().isEmpty()) {
            query.addCriteria(new Criteria().orOperator(
                    Criteria.where("name").regex(req.getQuery(), "i"),
                    Criteria.where("sku").regex(req.getQuery(), "i"),
                    Criteria.where("keywords").regex(req.getQuery(), "i"),
                    Criteria.where("brand").regex(req.getQuery(), "i")
            ));
        }

        if (req.getCategoriesFilter() != null && !req.getCategoriesFilter().isEmpty()) {
            query.addCriteria(Criteria.where("categories").all(req.getCategoriesFilter()));
        }

        if (req.getMaxPriceFilter() != null && req.getMaxPriceFilter().compareTo(Constants.SEARCH_PRODUCT_MAX_PRICE_FILTER_MAX_VALUE)<=0) {
            query.addCriteria(Criteria.where("price").lte(req.getMaxPriceFilter()));
        }

        if (req.getInStockFilter() != null && req.getInStockFilter()){
            query.addCriteria(Criteria.where("stock").gte( 1 ));
        }

        if (req.getBrandFilter() != null && !req.getBrandFilter().isEmpty()) {
             query.addCriteria(Criteria.where("brand").regex(req.getBrandFilter(), "i"));
        }

        Sort sort = null;
        if (req.getOrderFilter() == Enums.SearchRequestOrderFilter.DEFAULT.getCode()){
            sort = Sort.by(Sort.Direction.DESC, "createdAt");
        } else if (req.getOrderFilter() == Enums.SearchRequestOrderFilter.LOWEST_PRICE.getCode()){
             sort = Sort.by(Sort.Direction.ASC, "price");
        } else if (req.getOrderFilter() == Enums.SearchRequestOrderFilter.HIGHEST_PRICE.getCode()){
             sort = Sort.by(Sort.Direction.DESC, "price");
        } else if (req.getOrderFilter() == Enums.SearchRequestOrderFilter.RECOMMENDED.getCode()){
             sort = Sort.by(Sort.Direction.DESC, "stock");
        } else if (req.getOrderFilter() == Enums.SearchRequestOrderFilter.ALPHABETICAL.getCode()){
             sort = Sort.by(Sort.Direction.ASC, "name");
        }

        if (req.getOnSaleFilter() != null && req.getOnSaleFilter()) {
            LocalDateTime now = LocalDateTime.now();

            Criteria discountExistsCriteria = Criteria.where("discount").exists(true);
            Criteria startDateCriteria = Criteria.where("discount.startDate").lte(now);
            Criteria endDateCriteria = Criteria.where("discount.endDate").gte(now);

            query.addCriteria(discountExistsCriteria);
            query.addCriteria(startDateCriteria);
            query.addCriteria(endDateCriteria);
        }

        if (req.getExcludedIds()!=null && !req.getExcludedIds().isEmpty()){
            query.addCriteria(Criteria.where("id").nin(req.getExcludedIds()));
        }

        query.addCriteria(Criteria.where("isAvailable").is(true));

        int page = req.getPage() - 1;
        Pageable pageable = PageRequest.of(page, PRODUCT_SEARCH_PAGE_SIZE);

        List<Product> list = mongoTemplate.find(query.with(pageable).with(sort), Product.class, "products");
        long total = mongoTemplate.count(query.skip(0).limit(0), Product.class, "products");
        int totalPages = (int) Math.ceil((double) total / PRODUCT_SEARCH_PAGE_SIZE);

        return DynamicReport.<Product>builder()
                .data(list)
                .totalPages(totalPages)
                .build();
    }

    @Override
    public List<Product> findByListId(List<Product> req) {
        List<String> productIds = req.stream()
                .map(Product::getId)
                .collect(Collectors.toList());
        Query query = Query.query(Criteria.where("id").in(productIds));
        query.fields()
                .exclude("keywords")
                .exclude("status")
                .exclude("createdAt")
                .exclude("updatedAt")
        ;
        List<Product> productList = mongoTemplate.find(query, Product.class, "products");
        return productList;
    }

}
