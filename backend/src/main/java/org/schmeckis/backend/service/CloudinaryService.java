package org.schmeckis.backend.service;

import com.cloudinary.Cloudinary;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;

    private final RezeptService rezeptService;

    public CloudinaryService(Cloudinary cloudinary, RezeptService rezeptService) {
        this.cloudinary = cloudinary;
        this.rezeptService = rezeptService;
    }

    public static String generateRandomFileName(String originalFileName) {
        String fileExtension = "";
        int i = originalFileName.lastIndexOf('.');
        if (i > 0) {
            fileExtension = originalFileName.substring(i + 1);
        }
        UUID uuid = UUID.randomUUID();
        return uuid + (fileExtension.isEmpty() ? "" : "." + fileExtension);
    }

    public String uploadFile(@NonNull MultipartFile file, String id) throws IOException {
        String randomFileName = generateRandomFileName(Objects.requireNonNull(file.getOriginalFilename()));
        Path pathToUpload = Files.createTempFile("file", null);
        File fileToUpload = pathToUpload.toFile();
        file.transferTo(fileToUpload);
        var cloudinaryResponse = cloudinary.uploader().upload(fileToUpload, Map.of(
                "resource_type", "auto",
                "public_id", randomFileName,
                "folder", "cloudinary_file_test"
        ));

        String imageUrl = cloudinaryResponse.get("secure_url").toString();
        rezeptService.attachPhoto(id, imageUrl);

        return imageUrl;
    }

}
