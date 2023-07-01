package com.example.demo.service;

import com.example.demo.model.Order;
import com.example.demo.model.Product;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.ReportRequest;
import com.example.demo.model.validation.UpdateOrderStatusRequest;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Override
    public DynamicReport<Order> report(ReportRequest req) throws ParseException {
        return orderRepository.report(req);
    }

    @Override
    public Integer updateOrderStatus(UpdateOrderStatusRequest req) {
        Order orderDb = orderRepository.getById(req.getId());
        String previousStatus = orderDb.getStatus();
        Integer result = orderRepository.updateOrderStatus(req);
        if (result==1){
            if (req.getNewStatus().equals(Enums.OrderStatus.PAYMENT_CONFIRMED.getValue())){
                List<Product> dbProductList = productRepository.findByListId(orderDb.getProducts());
                Utils.copyProductQuantityFromGiverToTarget(orderDb.getProducts(), dbProductList);
                productRepository.updateProductsStock(Utils.updateStockOfProductsOfOrderInPaymentConfirmed(dbProductList));

            } else if (req.getNewStatus().equals(Enums.OrderStatus.CANCELED.getValue())){
                if (previousStatus.equals(Enums.OrderStatus.PAYMENT_IN_PROCESS.getValue()) ||
                    previousStatus.equals(Enums.OrderStatus.PAYMENT_CONFIRMED.getValue())
                ){
                    List<Product> dbProductList = productRepository.findByListId(orderDb.getProducts());
                    Utils.copyProductQuantityFromGiverToTarget(orderDb.getProducts(), dbProductList);
                    productRepository.updateProductsStock(Utils.updateStockOfProductsOfOrderInCanceledStatus(previousStatus, dbProductList));
                }
            }
        }
        return result;
    }

}
