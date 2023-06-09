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

    public static String generateEightDigitsCode() {
        Random rand = new Random(System.currentTimeMillis());
        int code = rand.nextInt(90000000) + 10000000;
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

    public static void copyProductQuantityFromGiverToTarget(List<Product> giver, List<Product> target) {
        for (Product originProduct : giver) {
            for (Product targetProduct : target) {
                if (targetProduct.getId().equals(originProduct.getId())) {
                    targetProduct.setQuantity(originProduct.getQuantity());
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


    public static List<Product> updateStockOfProductsOfOrderInPaymentInProcess(List<Product> list){
        List<Product> newList = new ArrayList<>(list);
        newList = newList.stream().map(value -> Product.builder()
                .id(value.getId())
                .availableStock(value.getAvailableStock() - value.getQuantity())
                .reservedStock(value.getReservedStock() + value.getQuantity())
                .build()).collect(Collectors.toList());
        return newList;
    }

    public static List<Product> updateStockOfProductsOfOrderInPaymentConfirmed(List<Product> list){
        List<Product> newList = new ArrayList<>(list);
        newList = newList.stream().map(value -> Product.builder()
                .id(value.getId())
                .reservedStock(value.getReservedStock() - value.getQuantity())
                .soldStock(value.getSoldStock() + value.getQuantity())
                .build()).collect(Collectors.toList());
        return newList;
    }

    public static List<Product> updateStockOfProductsOfOrderInCanceledStatus(String previousStatus, List<Product> list){
        List<Product> newList = new ArrayList<>(list);
        if (previousStatus.equals(Enums.OrderStatus.PAYMENT_IN_PROCESS.getValue())){
            newList = newList.stream().map(value -> Product.builder()
                    .id(value.getId())
                    .availableStock(value.getAvailableStock() + value.getQuantity())
                    .reservedStock(value.getReservedStock() - value.getQuantity())
                    .build()).collect(Collectors.toList());

        } else if (previousStatus.equals(Enums.OrderStatus.PAYMENT_CONFIRMED.getValue())){
            newList = newList.stream().map(value -> Product.builder()
                    .id(value.getId())
                    .availableStock(value.getAvailableStock() + value.getQuantity())
                    .soldStock(value.getSoldStock() - value.getQuantity())
                    .build()).collect(Collectors.toList());
        }
        return newList;
    }
}
