package com.example.demo.service;

import com.example.demo.model.Address;
import com.example.demo.model.Customer;
import com.example.demo.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service()
public class AddressServiceImpl implements AddressService{

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public List<Address> findAddresses(List<Address> req) {
        return addressRepository.findByListId(req);
    }


}
