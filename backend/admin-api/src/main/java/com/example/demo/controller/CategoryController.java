package com.example.demo.controller;

import com.example.demo.model.Category;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.CategoryReportRequest;
import com.example.demo.service.CategoryService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;


@Slf4j
@RestController()
@RequestMapping("admin/category")
public class CategoryController {
    private final CategoryService categoryService;
    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @PostMapping("report")
    public DynamicReport<Category> report(@Valid @RequestBody CategoryReportRequest req) throws ParseException {
        log.info("report");
        return categoryService.report(req);
    }
    @PostMapping("create")
    ResponseEntity<?> create(@Valid @RequestBody Category category) {
        log.info("create");
        categoryService.create(category);
        return ResponseEntity.ok(1);
    }

    @PostMapping("update")
    ResponseEntity<?> update(@Valid @RequestBody Category category) {
        log.info("update");
        return ResponseEntity.ok(categoryService.update(category));
    }

    @DeleteMapping("delete")
    ResponseEntity<?> delete(@Valid @RequestBody Category category) {
        log.info("delete");
        return ResponseEntity.ok(categoryService.delete(category));
    }


}
