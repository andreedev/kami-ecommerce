package com.example.demo.utils;

import com.example.demo.model.Category;
import com.example.demo.model.Discount;
import com.example.demo.model.Product;
import com.example.demo.model.validation.CustomCategory;
import com.example.demo.model.validation.SimplifiedProduct;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
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

    public static String generateSixDigitsCode() {
        Random rand = new Random(System.currentTimeMillis());
        int code = rand.nextInt(900000) + 100000;
        return Integer.toString(code);
    }

    public static List<Product> convertToProductList(List<SimplifiedProduct> products) {
        return products.stream()
                .map( value -> Product.builder()
                        .id(value.getId())
                        .quantity(value.getQuantity())
                        .build())

                .collect(Collectors.toList());
    }

    public static List<CustomCategory> convertToCustomCategoryList(List<Category> list) {
        return list.stream()
                .map(item -> new CustomCategory(
                        item.getName(),
                        item.getMediaUrl()
                    )
                )
                .collect(Collectors.toList());
    }

    public static BigDecimal calculateCartSubtotal(List<Product> list) {
        BigDecimal subtotal = BigDecimal.ZERO;
        for (Product product : list) {
            BigDecimal price = (product.getDiscount() != null) ? product.getDiscount().getPriceWithDiscountApplied() : product.getPrice();
            BigDecimal quantity = new BigDecimal(product.getQuantity());
            BigDecimal productSubtotal = price.multiply(quantity);
            subtotal = subtotal.add(productSubtotal);
        }
        return subtotal.setScale(2, BigDecimal.ROUND_HALF_UP);
    }
    public static int countCartTotalAmount(List<Product> list){
        int totalAmount = 0;
        for (Product product : list) {
            totalAmount += product.getQuantity();
        }
        return totalAmount;
    }

    public static Collection<GrantedAuthority> parseToGrantedAuthorityCollection(List<String> roles){
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        roles.forEach(role -> { authorities.add(new SimpleGrantedAuthority(role)); });
        return authorities;
    }

    public static List<String> parseToStringList(Collection<? extends GrantedAuthority> authorities) {
        List<String> roles = new ArrayList<>();
        authorities.forEach(authority -> roles.add(authority.getAuthority()));
        return roles;
    }

    public static void transferProductQuantity(List<Product> target, List<Product> origin) {
        for (Product targetProduct : target) {
            for (Product originProduct : origin) {
                if (targetProduct.getId().equals(originProduct.getId())) {
                    originProduct.setQuantity(targetProduct.getQuantity());
                    break;
                }
            }
        }
    }

    public static void setupProductDiscount(List<Product> list){
        LocalDateTime currentDate = LocalDateTime.now();
        for (Product product : list) {
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
