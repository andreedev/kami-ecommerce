package com.example.demo.service;

import com.example.demo.model.Address;

import java.util.List;

public interface AddressService {
    List<Address> findAddresses(List<Address> req);

}
