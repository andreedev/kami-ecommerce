package com.example.demo.utils;

import com.example.demo.model.Product;
import com.example.demo.model.validation.CustomProduct;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

public class Utils {

    public static String getCurrentTimestamp(){
        return String.valueOf(new Timestamp(System.currentTimeMillis()));
    }

    public static String generateEmailVerificationCode() {
        Random rand = new Random(System.currentTimeMillis());
        int code = rand.nextInt(900000) + 100000;
        return Integer.toString(code);
    }

    public static List<CustomProduct> convertToCustomProductList(List<Product> products) {
        return products.stream()
                .map(product -> new CustomProduct(
                        product.getId(),
                        product.getName(),
                        product.getSku(),
                        product.getPrice(),
                        product.getDiscount(),
                        product.getBrand(),
                        product.getCategories(),
                        product.getSpecifications(),
                        product.getMediaUrls(),
                        product.getRating(),
                        product.getStock(),
                        0
                    )
                )
                .collect(Collectors.toList());
    }

    public static BigDecimal calculateCartSubtotal(List<CustomProduct> list) {
        BigDecimal subtotal = BigDecimal.ZERO;
        for (CustomProduct product : list) {
            BigDecimal price = (product.getDiscount() != null) ? product.getDiscount().getPriceWithDiscountApplied() : product.getPrice();
            BigDecimal amount = new BigDecimal(product.getAmount());
            BigDecimal productSubtotal = price.multiply(amount);
            subtotal = subtotal.add(productSubtotal);
        }
        return subtotal.setScale(2, BigDecimal.ROUND_HALF_UP);
    }
    public static int countCartTotalAmount(List<CustomProduct> list){
        int totalAmount = 0;
        for (CustomProduct product : list) {
            totalAmount += product.getAmount();
        }
        return totalAmount;
    }
}
