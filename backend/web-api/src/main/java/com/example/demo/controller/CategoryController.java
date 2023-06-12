package com.example.demo.controller;

import com.example.demo.model.Category;
import com.example.demo.model.validation.CustomCategory;
import com.example.demo.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@Slf4j
@RestController()
@RequestMapping("category")
public class CategoryController {
    private final CategoryService categoryService;
    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @GetMapping("categories")
    public List<CustomCategory> getAllCategories(){
        log.info("getAllCategories");
        return categoryService.findAll();
    }


}
