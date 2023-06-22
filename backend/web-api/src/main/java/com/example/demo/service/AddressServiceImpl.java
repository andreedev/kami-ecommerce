package com.example.demo.service;

import com.example.demo.model.Address;
import com.example.demo.model.Customer;
import com.example.demo.model.VerificationCode;
import com.example.demo.model.validation.VerifyEmailCodeServiceResult;
import com.example.demo.model.validation.VerifyResetPasswordRequest;
import com.example.demo.repository.AddressRepository;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service()
public class AddressServiceImpl implements AddressService{

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<Address> loadAddresses(List<Address> req) {
        return addressRepository.findByListId(req);
    }

    @Override
    public Address findById(String id) {
        return addressRepository.findById(id);
    }

    @Override
    public boolean existsAddressByLine(String customerId, String line) {
        return addressRepository.existsAddressByLine(customerId, line);
    }

    @Override
    public boolean saveAddress(Customer customer, Address address) {
        address.setActive(true);
        address.setCustomerId(customer.getId());
        return addressRepository.saveAddress(customer,address);
    }

    @Override
    public boolean deleteAddress(Customer customer, String addressId) {
        return addressRepository.deleteAddress(customer, addressId);
    }

}
