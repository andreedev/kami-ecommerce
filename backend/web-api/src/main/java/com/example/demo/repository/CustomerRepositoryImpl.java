package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.EmailVerificationCode;
import com.example.demo.model.validation.CustomerRegistrationRequest;
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
import jakarta.validation.constraints.Email;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Slf4j
@Component
public class CustomerRepositoryImpl implements CustomerRepository {
    private final MongoTemplate mongoTemplate;
    @Autowired
    public CustomerRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Boolean customerExistsByUsernameOrEmailOrDocumentNumber(CustomerRegistrationRequest req) {
        Query query = new Query();
        query.addCriteria(
            new Criteria().orOperator(
                where("username").is(req.getUsername()),
                where("email").regex(req.getEmail(), "i"),
                where("documentNumber").is(req.getDocumentNumber())
            )
        );
        return mongoTemplate.exists(query, Customer.class);
    }

    @Override
    public Customer findByUsername(String username) {
        Query query = new Query(where("username").is(username));
        return mongoTemplate.findOne(query, Customer.class, "customers");
    }

    @Override
    public Customer registerCustomer(Customer customer) {
        log.info("registerCustomer");
        Customer result = mongoTemplate.save(customer, "customers");
        return result;
    }

    @Override
    public String generateEmailVerificationCode(String customerId) {
        String code = Utils.generateEmailVerificationCode();
        EmailVerificationCode emailVerificationCode = EmailVerificationCode.builder().code(code).customerId(customerId).build();
        EmailVerificationCode result = mongoTemplate.save(emailVerificationCode, "emailVerificationCodes");
        return code;
    }

    @Override
//    @Transactional
    public Integer verifyEmail(String emailVerificationCode) {
        Query query = new Query(where("code").is(emailVerificationCode));
        EmailVerificationCode emailVerificationCodeDb = mongoTemplate.findOne(query, EmailVerificationCode.class, "emailVerificationCodes");
        if (emailVerificationCodeDb!= null && emailVerificationCodeDb.getCustomerId()!=null) {
            Query query2 = new Query(
                new Criteria().andOperator(
                    Criteria.where("id").is(emailVerificationCodeDb.getCustomerId()),
                    Criteria.where("status").is(Enums.CustomerStatus.REGISTERED.getCode())
            ));
            Update update = new Update().set("status", Enums.CustomerStatus.EMAIL_VERIFIED.getCode());
            mongoTemplate.updateFirst(query2, update, Customer.class);
            mongoTemplate.remove(emailVerificationCodeDb, "emailVerificationCodes");
            return 1;
        }
        return -1;
    }
}
