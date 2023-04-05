package com.example.demo.utils;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;

import java.io.IOException;

@Service("AwsUtil")
public class AwsUtil {
    private static final Logger logger = LoggerFactory.getLogger(AwsUtil.class);

    @Value("${AWS_ACCESS_KEY_ID}")
    private String awsAccessKeyId;

    @Value("${AWS_SECRET_ACCESS_KEY}")
    private String awsSecretAccessKey;

    @Value("${aws.s3.resources.bucket}")
    private String awsS3ResourcesBucket;

    public String uploadFileS3(MultipartFile file) throws IOException {
        BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(
            awsAccessKeyId,
            awsSecretAccessKey
        );

        final AmazonS3 s3 = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials))
                .withRegion(Regions.US_EAST_1).build();
        logger.info("uploadFileS3 "+file.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(file.getContentType());
        objectMetadata.setContentLength(file.getSize());
        PutObjectRequest putObjectRequest = new PutObjectRequest(
            awsS3ResourcesBucket,
            file.getOriginalFilename(),
            file.getInputStream(),
            objectMetadata
        );
        file.getInputStream().close();
        putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);
        PutObjectResult resultado = s3.putObject(putObjectRequest);

        S3Client s3Client = S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(awsAccessKeyId, awsSecretAccessKey)))
                .region(Region.US_EAST_1)
                .build();
        GetUrlRequest request = GetUrlRequest.builder().bucket(awsS3ResourcesBucket).key(file.getOriginalFilename()).build();
        String url = s3Client.utilities().getUrl(request).toExternalForm();
        logger.info("result uploadFileS3: " + resultado.getETag() + " | " + resultado.getContentMd5() + " | URL: "+url);
        return url;
    }


}
