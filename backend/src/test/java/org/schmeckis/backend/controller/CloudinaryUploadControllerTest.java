package org.schmeckis.backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import org.junit.jupiter.api.Test;
import org.schmeckis.backend.service.CloudinaryService;
import org.schmeckis.backend.service.RezeptService;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.Mockito.*;

class CloudinaryUploadControllerTest {

    private final Cloudinary mockCloudinary = mock(Cloudinary.class);

    private final RezeptService mockRezeptService = mock(RezeptService.class);

    @Test
    void uploadFileTest_whenFileIsProvided_whenReturnUrlToFile() throws IOException {
        // ARRANGE
        MultipartFile mockFile = mock(MultipartFile.class);
        Map<String, Object> mockResponse = Map.of("secure_url", "http://example.com/image");
        String id = "1";


        when(mockFile.getOriginalFilename()).thenReturn("image.png");
        when(mockFile.getBytes()).thenReturn(new byte[]{1, 2, 3, 4, 5});
        when(mockCloudinary.uploader()).thenReturn(mock(Uploader.class));
        when(mockCloudinary.uploader().upload(any(File.class), anyMap())).thenReturn(mockResponse);

        CloudinaryService serviceUnderTest = new CloudinaryService(mockCloudinary, mockRezeptService);
        // ACT
        String result = serviceUnderTest.uploadFile(mockFile, id);

        // ASSERT
        assertEquals("http://example.com/image", result);
        verify(mockRezeptService).attachPhoto(id, result);
        verifyNoMoreInteractions(mockRezeptService);
    }

}