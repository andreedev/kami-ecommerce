package com.example.demo.service;

import com.example.demo.model.Category;
import com.example.demo.model.validation.CustomCategory;

import java.util.List;


public interface CategoryService {
    List<CustomCategory> findAll();
}
