package com.example.demo.repository.events;

import com.mongodb.client.*;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.changestream.ChangeStreamDocument;
import com.mongodb.client.model.changestream.FullDocument;
import com.mongodb.client.model.changestream.OperationType;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.bson.BsonValue;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Slf4j
@Component
public class MongoDBChangeStream {

    @Value("${spring.data.mongodb.uri}")
    private String replicaSetMongoUri;

    @Value("${spring.data.mongodb.database}")
    private String dbName;

    @EventListener(ContextRefreshedEvent.class)
    public void watchForDeletedEmailVerificationCodes() {
//        MongoClient mongoClient = MongoClients.create(replicaSetMongoUri);
//        MongoCollection<Document> collection = mongoClient.getDatabase(dbName).getCollection("emailVerificationCodes");
//
//        // Create pipeline for operationType filter
//        List<Bson> pipeline = Collections.singletonList(
//            Aggregates.match(
//                Filters.in(
//                    "operationType", Collections.singletonList("delete")
//            )));
//
//        // Create the Change Stream
//        ChangeStreamIterable<Document> changeStream = collection.watch(pipeline)
//                .fullDocument(FullDocument.UPDATE_LOOKUP);
//
//        // Iterate over the Change Stream
//        for (ChangeStreamDocument<Document> changeEvent : changeStream) {
//            // Process the change event here
//            if (changeEvent.getOperationType() == OperationType.DELETE) {
//                System.out.println("MongoDB Change Stream detected a delete");
//            }
//        }
    }

}
