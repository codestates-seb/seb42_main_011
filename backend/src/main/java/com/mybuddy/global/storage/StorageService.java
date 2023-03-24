package com.mybuddy.global.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

    String storeImage(MultipartFile image);

}
