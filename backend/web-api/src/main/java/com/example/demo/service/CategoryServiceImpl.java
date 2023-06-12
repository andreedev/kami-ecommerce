package com.example.demo.service;

import com.example.demo.model.Category;
import com.example.demo.model.validation.CustomCategory;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;
    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    @Override
    public List<CustomCategory> findAll() {
        List<Category> list = categoryRepository.findAll();
        return Utils.convertToCustomCategoryList(list);
    }
}
