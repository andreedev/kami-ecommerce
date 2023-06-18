package com.example.demo.repository;

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
        log.info("existsByEmail");
        Query query = new Query();
        query.addCriteria(where("email").regex(email, "i"));
        return mongoTemplate.exists(query, Customer.class);
    }

    @Override
    public boolean existsByDocumentNumber(String documentNumber) {
        log.info("existsByDocumentNumber");
        Query query = new Query();
        query.addCriteria(where("documentNumber").is(documentNumber));
        return mongoTemplate.exists(query, Customer.class);
    }

    @Override
    public Customer findById(String id) {
        log.info("findById");
        return mongoTemplate.findById(id, Customer.class, "customers");
    }

    @Override
    public Customer findByUsername(String username) {
        Query query = new Query(where("username").is(username));
        return mongoTemplate.findOne(query, Customer.class, "customers");
    }

    @Override
    public Customer findByEmail(String email) {
        log.info("findByEmail");
        Query query = new Query();
        query.addCriteria(new Criteria().andOperator(
                where("email").regex(email, "i")
        ));
        return mongoTemplate.findOne(query, Customer.class, "customers");
    }

    @Override
    public Customer findByEmail(String email, Integer statusFilter) {
        log.info("findByEmail with statusFilter");
        Query query = new Query();
        query.addCriteria(new Criteria().andOperator(
                where("email").regex(email, "i"),
                where("status").is(statusFilter)
        ));
        return mongoTemplate.findOne(query, Customer.class, "customers");
    }

    @Override
    public Customer registerCustomer(Customer customer) {
        log.info("registerCustomer");
        Customer result = mongoTemplate.save(customer, "customers");
        return result;
    }

    @Override
    public String generateVerificationCode(VerificationCode verificationCode) {
        Query query = new Query(where("customerId").is(verificationCode.getCustomerId()));
        mongoTemplate.remove(query, "verificationCodes");
        VerificationCode result = mongoTemplate.save(verificationCode, "verificationCodes");
        return result.getCode();
    }

    @Override
//    @Transactional
    public VerifyEmailCodeServiceResult verifyEmailCode(String code) {
        Query query = new Query(where("code").is(code));
        VerificationCode verificationCode = mongoTemplate.findOne(query, VerificationCode.class, "verificationCodes");
        if (verificationCode != null && verificationCode.getCustomerId()!=null &&
            verificationCode.getType().equals(Enums.VerificationCodeType.EMAIL_VERIFICATION.getCode())
        ) {
            Query query2 = new Query(
                new Criteria().andOperator(
                    Criteria.where("id").is(verificationCode.getCustomerId()),
                    Criteria.where("status").is(Enums.CustomerStatus.UNVERIFIED_EMAIL.getCode())
            ));
            Update update = new Update().set("status", Enums.CustomerStatus.VERIFIED_EMAIL.getCode());
            mongoTemplate.updateFirst(query2, update, Customer.class);
            mongoTemplate.remove(verificationCode, "verificationCodes");
            return VerifyEmailCodeServiceResult.builder().code(1).verificationCode(verificationCode).build();
        }
        return VerifyEmailCodeServiceResult.builder().code(-1).build();
    }

    @Override
    public boolean verifyResetPassword(VerifyResetPasswordRequest req) {
        Query query = new Query(new Criteria().andOperator(
                where("code").is(req.getCode()),
                where("type").is(Enums.VerificationCodeType.PASSWORD_RESET.getCode())
        ));
        VerificationCode verificationCode = mongoTemplate.findOne(query, VerificationCode.class, "verificationCodes");
        if (verificationCode==null || verificationCode.getCustomerId()==null) return false;
        Query query2 = new Query(Criteria.where("id").is(verificationCode.getCustomerId()));
        Update update = new Update().set("password", req.getNewPassword());
        UpdateResult updateResult = mongoTemplate.updateFirst(query2, update, Customer.class, "customers");
        if (updateResult.getModifiedCount() == 0) return false;
        mongoTemplate.remove(verificationCode, "verificationCodes");
        return true;
    }

    @Override
    public void deleteById(String id) {
        log.info("deleteById");
        Query query = new Query(Criteria.where("id").is(id).and("status").is(Enums.CustomerStatus.UNVERIFIED_EMAIL.getCode()));
        mongoTemplate.remove(query, Customer.class, "customers");
    }

    @Override
    public boolean linkToGoogleAccount(Customer customer) {
        Query query = new Query(new Criteria().andOperator(
                where("email").regex(customer.getEmail(), "i"),
                where("isLinkedToGoogleAccount").is(false)
        ));
        Update update = new Update().set("isLinkedToGoogleAccount", true);
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Customer.class);
        return updateResult.getModifiedCount()==1;
    }

    @Override
    public boolean updateCart(Customer customer) {
        Query query = new Query(Criteria.where("id").is(customer.getId()));
        Update update = new Update().set("cart", customer.getCart());
        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Customer.class);
        return updateResult.getModifiedCount()==1;
    }


}
