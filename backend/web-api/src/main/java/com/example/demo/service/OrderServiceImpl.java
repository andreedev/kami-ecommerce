package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.SearchOrdersRequest;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@Service()
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private AddressService addressService;

    @Override
    public Order calculatePayment(Order order) {
        assert !order.getProducts().isEmpty();
        List<Product> dbProductList = productRepository.findByListId(order.getProducts());
        Utils.transferProductQuantity(order.getProducts(), dbProductList);
        order.setProducts(dbProductList);
        Utils.setupProductDiscount(order.getProducts());
        order.setSubTotal(Utils.calculateCartSubtotal(order.getProducts()));
        if (order.getDelivery().getDeliveryMethod().equals(Enums.DeliveryMethod.DELIVERY.getValue())){
            //calculate delivery cost
            //default value for any address
            order.setDeliveryCost(new BigDecimal("12.50"));
        } else if (order.getDelivery().getDeliveryMethod().equals(Enums.DeliveryMethod.IN_STORE_PICKUP.getValue())){
            order.setDeliveryCost(new BigDecimal(BigInteger.ZERO));
            order.getDelivery().setShippingAddress(null);
        }
        order.setTotal(order.getSubTotal().add(order.getDeliveryCost()));
        if (!checkListProductStock(order, dbProductList)) return null;
        return Order.builder()
                .deliveryCost(order.getDeliveryCost())
                .subTotal(order.getSubTotal())
                .total(order.getTotal())
                .build();
    }

    @Override
    public Order create(Order order) {
        List<Product> dbProductList = productRepository.findByListId(order.getProducts());
        Utils.transferProductQuantity(order.getProducts(), dbProductList);
        order.setProducts(dbProductList);
        Utils.setupProductDiscount(order.getProducts());
        order.setSubTotal(Utils.calculateCartSubtotal(order.getProducts()));
        if (order.getDelivery().getDeliveryMethod().equals(Enums.DeliveryMethod.DELIVERY.getValue())){
            //calculate delivery cost
            //default value for any address
            order.setDeliveryCost(new BigDecimal("12.50"));
            Address address = addressService.findById(order.getDelivery().getShippingAddress().getId());
            order.getDelivery().setShippingAddress(
                    Address.builder()
                            .id(address.getId())
                            .line(address.getLine())
                            .reference(address.getReference())
                            .build()
            );
        } else if (order.getDelivery().getDeliveryMethod().equals(Enums.DeliveryMethod.IN_STORE_PICKUP.getValue())){
            order.setDeliveryCost(new BigDecimal(BigInteger.ZERO));
            order.getDelivery().setShippingAddress(null);
        }
        order.setTotal(order.getSubTotal().add(order.getDeliveryCost()));
        List<Product> reducedStockProducts = Utils.updateStockOfProductsOfOrderInPaymentInProcess(order.getProducts());
        List<Product> productListReadyToBeNestedInOrderObject = order.getProducts().stream().map(value->Product.builder()
                .id(value.getId())
                .name(value.getName())
                .quantity(value.getQuantity())
                .price(value.getPrice())
                .discount(value.getDiscount())
                .mediaUrls(value.getMediaUrls())
                .sku(value.getSku())
                .brand(value.getBrand())
                .build()
        ).collect(Collectors.toList());
        order.setProducts(productListReadyToBeNestedInOrderObject);
        order.getPayment().setTotalPaid(order.getTotal());
        Order result = orderRepository.create(order);
        if (result!=null){
            productRepository.updateProductsStock(reducedStockProducts);
        }
        return result;
    }

    @Override
    public DynamicReport<Order> searchOrders(Customer customer, SearchOrdersRequest request) {
        return orderRepository.searchOrders(customer, request);
    }

    @Override
    public Order findById(String id) {
        return orderRepository.findById(id);
    }

    @Override
    public boolean update(Order order) {
        return orderRepository.update(order);
    }


    private boolean checkListProductStock(Order order, List<Product> dbProductList) {
        List<Product> productListRequested = order.getProducts();

        for (Product requestedProduct : productListRequested) {
            String requestedProductId = requestedProduct.getId();
            int requestedProductQuantity = requestedProduct.getQuantity();

            // Find the corresponding product in dbProductList
            Product dbProduct = dbProductList.stream()
                    .filter(product -> product.getId().equals(requestedProductId))
                    .findFirst()
                    .orElse(null);

            // Check if the product exists in dbProductList and if its stock is sufficient
            if (dbProduct != null && dbProduct.getAvailableStock() >= requestedProductQuantity) {
                // Sufficient stock available for this product
                continue;
            } else {
                // Insufficient stock for this product
                return false;
            }
        }

        // All products have sufficient stock
        return true;
    }

}
