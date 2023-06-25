package com.example.demo.repository;

import com.example.demo.model.Address;
import com.example.demo.model.Customer;
import com.mongodb.client.result.UpdateResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Slf4j
@Component
public class AddressRepositoryImpl implements AddressRepository {
    private final MongoTemplate mongoTemplate;
    @Autowired
    public AddressRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }
    @Override
    public List<Address> findByListId(List<Address> req) {
        List<String> ids = req.stream().map(Address::getId).collect(Collectors.toList());
        Query query = Query.query(Criteria.where("id").in(ids));
        return mongoTemplate.find(query, Address.class, "addresses");
    }

}
