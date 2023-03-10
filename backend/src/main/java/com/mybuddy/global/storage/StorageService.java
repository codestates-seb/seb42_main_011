package com.mybuddy.global.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    void storeImage(MultipartFile image);

    String getPath();
}
