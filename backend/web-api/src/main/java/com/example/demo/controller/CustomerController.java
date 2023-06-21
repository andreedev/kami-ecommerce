package com.example.demo.controller;

import com.example.demo.model.Address;
import com.example.demo.model.Customer;
import com.example.demo.model.validation.GetProfileResponse;
import com.example.demo.model.validation.Response;
import com.example.demo.service.CustomerService;
import com.example.demo.service.LocaleService;
import com.example.demo.service.ProductService;
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController()
@RequestMapping("customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    private final ProductService productService;
    private final LocaleService localeService;
    @GetMapping("profile")
    public GetProfileResponse getProfile(){
        log.info("getProfile");
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        GetProfileResponse response=  GetProfileResponse.builder().build();
        response.setName(customer.getName());
        response.setAddresses(customerService.loadAddresses(customer.getAddresses()));
        if (customer.getCart()!=null && customer.getCart().getProducts().size()>0){
            response.setCart(productService.loadCart(Utils.convertToProductList(customer.getCart().getProducts())));
        }
        return response;
    }

    @PostMapping("address/save")
    public Response saveAddress(@RequestBody @Valid Address req){
        log.info("saveAddress");
        Response response = Response.builder().build();
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (customer.getAddresses().size()>=5){
            response.setCode(Enums.SaveAddressResponseCode.ADDRESS_LIMIT_REACHED.getCode());
            response.setMessage(localeService.getMessage((Enums.SaveAddressResponseCode.ADDRESS_LIMIT_REACHED.getValue())));
            return response;
        };
        if (customerService.existsAddressByLine(customer.getId(), req.getLine())){
            response.setCode(Enums.SaveAddressResponseCode.ADDRESS_EXISTS.getCode());
            response.setMessage(localeService.getMessage((Enums.SaveAddressResponseCode.ADDRESS_EXISTS.getValue())));
            return response;
        }
        if (!customerService.saveAddress(customer, req)){
            response.setCode(Enums.SaveAddressResponseCode.ERROR.getCode());
            response.setMessage(localeService.getMessage((Enums.SaveAddressResponseCode.ERROR.getValue())));
            return response;
        }
        response.setCode(Enums.SaveAddressResponseCode.SUCCESS.getCode());
        response.setMessage(localeService.getMessage((Enums.SaveAddressResponseCode.SUCCESS.getValue())));
        return response;
    }

    @DeleteMapping("address/delete")
    public boolean deleteAddress(@RequestBody Map<String, Object> req){
        log.info("deleteAddress");
        String addressId = req.get("id").toString();
        if (!ObjectId.isValid(addressId)) return false;
        Customer customer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return customerService.deleteAddress(customer, addressId);
    }


}
