package com.example.demo.controller;

import com.example.demo.model.Cart;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.SearchRequest;
import com.example.demo.service.ProductService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RestController()
@RequestMapping("product")
public class ProductController {
    private final ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("search")
    public DynamicReport<Product> search(@RequestBody @Valid SearchRequest req){
        req.setPageSize(20);
        return productService.search(req);
    }

    @PostMapping("loadGuestCart")
    public Cart search(@RequestBody List<Product> req){
        return productService.loadCart(req);
    }

    @GetMapping("featured")
    public List<Product> featured(){
        return productService.getFeaturedProducts();
    }

    /*@GetMapping("getSearchRequestOrderFilter")
    public List<EnumResponse> getSearchRequestOrderFilter() {
        List<EnumResponse> response = new ArrayList<>();
        for (Enums.SearchRequestOrderFilter filter : Enums.SearchRequestOrderFilter.values()) {
            response.add(new EnumResponse(filter.getCode(), filter.toString()));
        }
        return response;
    }*/
}
