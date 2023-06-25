package com.example.demo.service;

import com.example.demo.model.Category;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.CategoryReportRequest;
import com.example.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;

@Service
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;
    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public DynamicReport<Category> report(CategoryReportRequest req) throws ParseException {
        return categoryRepository.report(req);
    }

    @Override
    public Category create(Category category) {
        return categoryRepository.create(category);
    }

    @Override
    public Integer update(Category category) {
        return categoryRepository.update(category);
    }

    @Override
    public Integer delete(Category category) {
        return categoryRepository.delete(category);
    }
}
