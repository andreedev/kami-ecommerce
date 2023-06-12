package com.example.demo.repository;

import com.example.demo.model.Category;

import java.util.List;

public interface CategoryRepository {
    List<Category> findAll();

}
