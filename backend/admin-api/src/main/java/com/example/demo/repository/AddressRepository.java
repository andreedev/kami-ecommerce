package com.example.demo.repository;

import com.example.demo.model.Address;
import com.example.demo.model.Customer;

import java.util.List;

public interface AddressRepository {
    List<Address> findByListId(List<Address> req);

}
