package com.example.demo.repository;

import com.example.demo.model.Category;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class CategoryRepositoryImpl implements CategoryRepository {
    private final MongoTemplate mongoTemplate;
    @Autowired
    public CategoryRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }
    @Override
    public List<Category> findAll() {
        return mongoTemplate.findAll(Category.class, "categories");
    }
}
