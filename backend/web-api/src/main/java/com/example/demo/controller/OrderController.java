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
    public Order calculatePayment(
            @RequestBody Map<String, Object> req){
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
    public Response createOrder(
            @RequestParam(required = false, name = "deliveryMethod") String deliveryMethod,
            @RequestParam(required = false, name = "shippingAddressId") String shippingAddressId,
            @RequestParam(required = false, name = "paymentMethod") String paymentMethod,
            @RequestParam(required = false, name = "file") MultipartFile file
    ){
        log.info("createOrder");
        Customer customer = getCustomerFromSession();
        Response response = new Response();
        if(customer.getCart()==null || customer.getCart().getProducts()==null || customer.getCart().getProducts().isEmpty()){
            response.setCode(-1);
            return response;
        }
        String uploadVoucherResult = null;
        String orderNumber = Utils.generateEightDigitsCode();
        try {
            uploadVoucherResult = awsUtil.uploadFileS3(file, orderNumber, "order/voucher/");
        } catch (Exception e) {
            log.error(e.getMessage());
            response.setCode(-2);
            response.setMessage(e.getMessage());
            return response;
        }
        if (uploadVoucherResult==null){
            response.setCode(-3);
            return response;
        }
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
                        .voucher(uploadVoucherResult)
                        .build())
                .orderNumber(orderNumber)
                .status(Enums.OrderStatus.PAYMENT_IN_PROCESS.getValue())
                .build();
        Order orderCreated = orderService.create(order);
        if (orderCreated==null){
            response.setCode(-4);
            return response;
        }
        customer.setCart(null);
        customerService.updateCart(customer);
        response.setData(orderCreated);
        response.setCode(1);
        return response;
    }

    @PostMapping("search")
    public DynamicReport<Order> getOrders(@RequestBody @Valid SearchOrdersRequest request){
        log.info("getOrders");
        Customer customer = getCustomerFromSession();
        return orderService.searchOrders(customer, request);
    }

    private Customer getCustomerFromSession(){
        return (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

}
