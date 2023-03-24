package com.mybuddy.global.storage;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.mybuddy.global.exception.StorageException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Date;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3StorageService implements StorageService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;


    @Override
    public String storeImage(MultipartFile multipartFile) {

        String s3FileName = UUID.randomUUID().toString().concat(getFileExtension(multipartFile.getOriginalFilename()));

        try {
            if (multipartFile.isEmpty()) {
                throw new StorageException("Failed to store a file");
            }
            ObjectMetadata objMeta = new ObjectMetadata();
            objMeta.setContentLength(multipartFile.getInputStream().available());

            log.info("Store an image into the storage");
            amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);

        } catch (IOException e) {
            throw new StorageException("Failed to store a file", e);
        }

        return amazonS3.getUrl(bucket, s3FileName).toString();
    }


    public void deleteImage(String photoUrl) {
        String fileName = photoUrl.substring(photoUrl.lastIndexOf("/")+1);
        amazonS3.deleteObject(bucket, fileName);
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

}
