package com.example.demo.service;

import com.example.demo.model.Category;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.CategoryReportRequest;
import com.example.demo.model.validation.ProductReportRequest;

import java.text.ParseException;


public interface CategoryService {
    DynamicReport<Category> report(CategoryReportRequest req) throws ParseException;
    Category create(Category category);
    Integer update(Category category);
    Integer delete(Category category);
}
