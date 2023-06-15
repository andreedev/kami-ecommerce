package com.example.demo.repository;

import com.example.demo.model.Customer;
import com.example.demo.model.EmailVerificationCode;
import com.example.demo.model.validation.VerifyEmailCodeServiceResult;
import com.example.demo.utils.Enums;
import com.example.demo.utils.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

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
    public boolean existsByEmail(String email) {
        Query query = new Query();
        query.addCriteria(new Criteria().andOperator(
            where("email").regex(email, "i"),
            where("status").is(Enums.CustomerStatus.EMAIL_VERIFIED.getCode())
        ));
        return mongoTemplate.exists(query, Customer.class);
    }

    @Override
    public boolean existsByDocumentNumber(String documentNumber) {
        Query query = new Query();
        query.addCriteria(new Criteria().andOperator(
                where("documentNumber").is(documentNumber.trim()),
                where("status").is(Enums.CustomerStatus.EMAIL_VERIFIED.getCode())
        ));
        return mongoTemplate.exists(query, Customer.class);
    }

    @Override
    public Customer findById(String id) {
        return mongoTemplate.findById(id, Customer.class, "customers");
    }

    @Override
    public Customer findByUsername(String username) {
        Query query = new Query(where("username").is(username));
        return mongoTemplate.findOne(query, Customer.class, "customers");
    }

    @Override
    public Customer findByEmail(String email) {
        Query query = new Query(where("email").is(email));
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
    public VerifyEmailCodeServiceResult verifyEmailCode(String code) {
        Query query = new Query(where("code").is(code));
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
            return VerifyEmailCodeServiceResult.builder().code(1).emailVerificationCode(emailVerificationCodeDb).build();
        }
        return VerifyEmailCodeServiceResult.builder().code(-1).build();
    }

    @Override
    public void deleteById(String id) {
        Query query = new Query(Criteria.where("id").is(id).and("status").is(Enums.CustomerStatus.REGISTERED.getCode()));
        mongoTemplate.remove(query, Customer.class, "customers");
    }


}
