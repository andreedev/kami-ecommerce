package com.example.demo.service;

import com.example.demo.model.Cart;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.SearchRequest;
import com.example.demo.repository.ProductRepository;
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public DynamicReport<Product> search(SearchRequest req) {
        DynamicReport<Product> result = productRepository.search(req);
        List<Product> list = result.getData();
        Utils.setupProductDiscount(list);
        DynamicReport<Product> result2 = new DynamicReport<Product>(list, result.getTotalPages());
        return result2;
    }

    @Override
    public Cart loadCart(List<Product> req) {
        List<Product> dbProductList = productRepository.findByListId(req);
        Utils.setupProductDiscount(dbProductList);
        Utils.transferProductQuantity(req, dbProductList);
        Cart cart = Cart.builder()
                .products(dbProductList)
                .subtotal(Utils.calculateCartSubtotal(dbProductList))
                .totalAmount(Utils.countCartTotalAmount(dbProductList))
                .build();
        return cart;
    }

    @Override
    public List<Product> getFeaturedProducts() {
        SearchRequest req = SearchRequest.builder()
                .query("")
                .orderFilter(Enums.SearchRequestOrderFilter.RECOMMENDED.getCode())
                .onSaleFilter(true)
                .page(1)
                .pageSize(12)
                .build();
        List<Product> featuredProducts = productRepository.search(req).getData();
        if (featuredProducts.size() < 8){
            int missing = 12 - featuredProducts.size();
            SearchRequest fallbackReq  = SearchRequest.builder()
                    .query("")
                    .orderFilter(Enums.SearchRequestOrderFilter.RECOMMENDED.getCode())
                    .page(1)
                    .pageSize(missing)
                    .excludedIds(featuredProducts.stream().map(Product::getId).collect(Collectors.toList()))
                    .build();
            featuredProducts.addAll(productRepository.search(fallbackReq).getData());
        }
        Utils.setupProductDiscount(featuredProducts);
        return featuredProducts;
    }

    @Override
    public boolean updateProductsStock(List<Product> list) {
        return productRepository.updateProductsStock(list);
    }


}
