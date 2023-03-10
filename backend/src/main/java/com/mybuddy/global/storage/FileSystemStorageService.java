package com.mybuddy.global.storage;

import com.mybuddy.global.exception.StorageException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Slf4j
@Service
public class FileSystemStorageService implements StorageService {

    private final Path rootPath = Paths.get("");

    @Override
    public void storeImage(MultipartFile image) {
        try {
            if (image.isEmpty()) {
                throw new StorageException("Failed to store a file");
            }
            Path destinationFile = this.rootPath.resolve(
                    Paths.get(image.getOriginalFilename())).normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootPath.toAbsolutePath())) {
                throw new StorageException("Cannot store a file outside of the current directory");
            }
            try (InputStream inputStream = image.getInputStream()) {
                log.info("Store an image into the storage");
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            throw new StorageException("Failed to store a file", e);
        }
    }

    @Override
    public String getPath() {
        return rootPath.toAbsolutePath().toString();
    }
}
