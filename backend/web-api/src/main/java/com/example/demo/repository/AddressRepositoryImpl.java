package com.example.demo.repository;

import com.example.demo.model.Address;
import com.example.demo.model.Customer;
import com.example.demo.model.VerificationCode;
import com.example.demo.model.validation.VerifyEmailCodeServiceResult;
import com.example.demo.model.validation.VerifyResetPasswordRequest;
import com.example.demo.utils.Enums;
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
        query.fields()
                .exclude("status")
        ;
        return mongoTemplate.find(query, Address.class, "addresses");
    }

    @Override
    public Address findById(String id) {
        return mongoTemplate.findById(id, Address.class, "addresses");
    }

    @Override
    public boolean existsAddressByLine(String customerId, String line) {
        log.info("existsAddressByLine");
        Query query = new Query();
        query.addCriteria(where("line").regex(line, "i").and("customerId").is(customerId).and("active").is(true));
        return mongoTemplate.exists(query, Address.class);
    }

    @Override
    public boolean saveAddress(Customer customer, Address address) {
        Address result = mongoTemplate.save(address, "addresses");
        Query query = new Query(Criteria.where("id").is(customer.getId()));
        Update update = new Update().push("addresses", Address.builder().id(result.getId()).build());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Customer.class);
        return updateResult.getModifiedCount()==1;
    }

    @Override
    public boolean deleteAddress(Customer customer, String addressId) {
        Query query = new Query(Criteria.where("id").is(addressId));
        Update update = new Update().set("active", false);
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Address.class);

        Query query2 = new Query(Criteria.where("id").is(customer.getId()));
        Update update2 = new Update().pull("addresses", Address.builder().id(addressId).build());
        UpdateResult updateResult2 = mongoTemplate.updateFirst(query2, update2, Customer.class);

        return updateResult2.getModifiedCount()==1;
    }



}
