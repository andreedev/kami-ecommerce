package com.example.demo.service;

import com.example.demo.model.Address;
import com.example.demo.model.Customer;
import com.example.demo.model.VerificationCode;
import com.example.demo.model.validation.VerifyEmailCodeServiceResult;
import com.example.demo.model.validation.VerifyResetPasswordRequest;

import java.util.List;

public interface AddressService {
    List<Address> loadAddresses(List<Address> req);
    Address findById(String id);
    boolean existsAddressByLine(String customerId, String line);
    boolean saveAddress(Customer customer, Address address);
    boolean deleteAddress(Customer customer, String addressId);

}
