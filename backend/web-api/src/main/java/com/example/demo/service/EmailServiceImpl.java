package com.example.demo.service;

import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.transactional.SendContact;
import com.mailjet.client.transactional.SendEmailsRequest;
import com.mailjet.client.transactional.TransactionalEmail;
import com.mailjet.client.transactional.response.MessageResult;
import com.mailjet.client.transactional.response.SendEmailsResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService{
    @Value("${api_mailjet_key}")
    private String apiMailjetKey;
    @Value("${api_mailjet_secret_key}")
    private String apiMailSecretKey;
    @Value("${sender_email}")
    private String senderEmail;
    @Value("${sender_name}")
    private String senderName;

    @Override
    public void sendEmail(String receiverEmail, String receiverName, String subject, String htmlPart) {

        if (apiMailjetKey==null ||apiMailjetKey.isEmpty()) return;

        ClientOptions options = ClientOptions.builder()
                .apiKey(apiMailjetKey)
                .apiSecretKey(apiMailSecretKey)
                .build();

        MailjetClient client = new MailjetClient(options);

//        String html = readFile(env.getProperty("path_mail")+htmlFileName);
//        html = MessageFormat.format(html, data);

        TransactionalEmail message1 = TransactionalEmail
                .builder()
                .to(new SendContact(receiverEmail, receiverName))
                .from(new SendContact(senderEmail,senderName))
                .htmlPart(htmlPart)
                .subject(subject)
                .build();

        SendEmailsRequest request = SendEmailsRequest
                .builder()
                .message(message1)
                .build();

        try {
            SendEmailsResponse response = request.sendWith(client);
            for (MessageResult message : response.getMessages()) {
                log.info(message.toString());
                log.info(message.getStatus().toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static String readFile(String pathFile) {
        StringBuffer buffer = new StringBuffer();
        String line = "";
        FileReader fReader = null;
        BufferedReader bReader;
        try {
            fReader = new FileReader(pathFile);
            bReader = new BufferedReader(fReader);
            while ((line = bReader.readLine()) != null) {
                buffer.append(line);
            }
            bReader.close();
            fReader.close();
            return buffer.toString();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (null != fReader) {
                    fReader.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }

        return null;
    }
}
