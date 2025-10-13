package com.examly.springapp.util;

import org.springframework.stereotype.Component;
import java.util.Base64;

@Component
public class EncryptionUtil {
    
    public String encodeBase64(byte[] data) {
        return Base64.getEncoder().encodeToString(data);
    }
    
    public byte[] decodeBase64(String data) {
        return Base64.getDecoder().decode(data);
    }
}