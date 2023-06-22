package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.model.validation.DynamicReport;
import com.example.demo.model.validation.Response;
import com.example.demo.model.validation.SearchOrdersRequest;
import com.example.demo.service.AddressService;
import com.example.demo.service.CustomerService;
import com.example.demo.service.OrderService;
import com.example.demo.utils.AwsUtil;
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Map;

@Slf4j
@RestController()
@RequestMapping("order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final CustomerService customerService;
    private final AwsUtil awsUtil;

    @PostMapping("payment/calculate")
    public Order calculatePayment(@RequestBody Map<String, Object> req){
        log.info("calculatePayment");
        String deliveryMethod = req.get("deliveryMethod").toString();
        String shippingAddressId = req.get("shippingAddressId").toString();
        Customer customer = getCustomerFromSession();
        if(customer.getCart()==null || customer.getCart().getProducts()==null || customer.getCart().getProducts().isEmpty()) return null;
        Order order = Order.builder()
                .products(Utils.convertToProductList(customer.getCart().getProducts()))
                .delivery(Delivery.builder()
                        .deliveryMethod(deliveryMethod)
                        .shippingAddress(Address.builder()
                                .id(shippingAddressId)
                                .build())
                        .build())
                .build();
        return orderService.calculatePayment(order);
    }
    @PostMapping("create")
    public boolean createOrder(@RequestBody Map<String, Object> req){
        log.info("createOrder");
        String deliveryMethod = req.get("deliveryMethod").toString();
        String shippingAddressId = req.get("shippingAddressId").toString();
        String paymentMethod = req.get("paymentMethod").toString();
        Customer customer = getCustomerFromSession();
        if(customer.getCart()==null || customer.getCart().getProducts()==null || customer.getCart().getProducts().isEmpty()) return false;
        Order order = Order.builder()
                .products(Utils.convertToProductList(customer.getCart().getProducts()))
                .delivery(Delivery.builder()
                        .deliveryMethod(deliveryMethod)
                        .shippingAddress(Address.builder()
                                .id(shippingAddressId)
                                .build())
                        .build())
                .payment(Payment.builder()
                        .paymentMethod(paymentMethod)
                        .build())
                .build();
        boolean result = orderService.create(order, customer);
        if (result){
            customer.setCart(null);
            customerService.updateCart(customer);
        }
        return result;
    }

    @PostMapping("search")
    public DynamicReport<Order> getOrders(@RequestBody @Valid SearchOrdersRequest request){
        log.info("getOrders");
        Customer customer = getCustomerFromSession();
        return orderService.searchOrders(customer, request);
    }

    @PostMapping("process")
    public Response processOrder (
            @RequestParam("id") String id,
            @RequestParam("file") MultipartFile file
    ) {
        log.info("#processOrder");
        Response response = Response.builder().build();
        if (!ObjectId.isValid(id)){
            response.setCode(-1);
            return response;
        }
        Order order = orderService.findById(id);
        if (order==null){
            response.setCode(-2);
            return response;
        }
        if (!order.getStatus().equals(Enums.OrderStatus.PENDING.getValue())){
            response.setCode(-3);
            return response;
        }
        String result = null;
        try {
            result = awsUtil.uploadFileS3(file, id, "order/voucher/");
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setCode(-4);
            response.setMessage(e.getMessage());
            return response;
        }
        if (result==null){
            response.setCode(-5);
            return response;
        }
        order.getPayment().setVoucher(result);
        order.getPayment().setCreatedAt(LocalDateTime.now());
        order.setStatus(Enums.OrderStatus.PAYMENT_IN_PROCESS.getValue());
        orderService.update(order);
        return response;
    }

    private Customer getCustomerFromSession(){
        return (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
