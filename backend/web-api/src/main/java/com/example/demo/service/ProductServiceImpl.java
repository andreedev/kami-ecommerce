package com.example.demo.service;

import com.example.demo.model.Cart;
import com.example.demo.model.Discount;
import com.example.demo.model.DynamicReport;
import com.example.demo.model.Product;
import com.example.demo.model.validation.CustomProduct;
import com.example.demo.model.validation.SearchRequest;
import com.example.demo.repository.ProductRepository;
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public DynamicReport<CustomProduct> search(SearchRequest req) {
        DynamicReport<Product> result = productRepository.search(req);
        List<CustomProduct> list = Utils.convertToCustomProductList(result.getData());
        setupProductDiscount(list);
        DynamicReport<CustomProduct> result2 = new DynamicReport<CustomProduct>(list, result.getTotalPages());
        return result2;
    }

    @Override
    public Cart loadGuestCart(List<CustomProduct> req) {
        List<Product> result = productRepository.findByListId(req);
        List<CustomProduct> list = Utils.convertToCustomProductList(result);
        setupProductDiscount(list);
        recoverGuestCartProductsAmount(req, list);
        Cart cart = Cart.builder()
                .products(list)
                .subtotal(Utils.calculateCartSubtotal(list))
                .totalAmount(Utils.countCartTotalAmount(list))
                .build();
        return cart;
    }

    @Override
    public List<CustomProduct> getFeaturedProducts() {
        SearchRequest req = SearchRequest.builder()
                .query("")
                .orderFilter(Enums.SearchRequestOrderFilter.RECOMMENDED.getCode())
                .onSaleFilter(true)
                .page(1)
                .pageSize(8)
                .build();
        List<CustomProduct> featuredProducts = Utils.convertToCustomProductList(productRepository.search(req).getData());
        if (featuredProducts.size() < 8){
            int missing = 8 - featuredProducts.size();
            SearchRequest fallbackReq  = SearchRequest.builder()
                    .query("")
                    .orderFilter(Enums.SearchRequestOrderFilter.RECOMMENDED.getCode())
                    .page(1)
                    .pageSize(missing)
                    .build();
            featuredProducts.addAll(Utils.convertToCustomProductList(productRepository.search(fallbackReq).getData()));
        }
        return featuredProducts;
    }

    private void recoverGuestCartProductsAmount(List<CustomProduct> req, List<CustomProduct> list) {
        for (CustomProduct reqProduct : req) {
            for (CustomProduct listProduct : list) {
                if (reqProduct.getId().equals(listProduct.getId())) {
                    listProduct.setAmount(reqProduct.getAmount());
                    break;
                }
            }
        }
    }

    private void setupProductDiscount(List<CustomProduct> list){
        LocalDateTime currentDate = LocalDateTime.now();

        for (CustomProduct product : list) {
            Discount discount = product.getDiscount();
            if (discount!=null && discount.getStartDate().isBefore(currentDate) && discount.getEndDate().isAfter(currentDate)){
                BigDecimal price = product.getPrice();
                Integer discountPercentage = product.getDiscount().getPercentage();
                BigDecimal discountAmount = price.multiply(BigDecimal.valueOf(discountPercentage)).divide(BigDecimal.valueOf(100));
                BigDecimal priceWithDiscount = price.subtract(discountAmount);
                priceWithDiscount = priceWithDiscount.setScale(2, RoundingMode.HALF_UP);
                product.getDiscount().setPriceWithDiscountApplied(priceWithDiscount);
            } else {
                product.setDiscount(null);
            }
        }
    }
}
