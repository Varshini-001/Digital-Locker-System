package com.examly.springapp.service;

import com.examly.springapp.model.Document;
import com.examly.springapp.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class DocumentService {
    
    @Autowired
    private DocumentRepository documentRepository;
    
    public Document uploadDocument(MultipartFile file, String email) throws IOException {
        String filename = file.getOriginalFilename();
        byte[] fileData = file.getBytes();
        
        Document document = new Document(filename, email, fileData);
        return documentRepository.save(document);
    }
    
    public Document saveDocument(String filename, String email, byte[] fileData) {
        Document document = new Document(filename, email, fileData);
        return documentRepository.save(document);
    }
    
    public Optional<Document> getDocument(Long id) {
        return documentRepository.findById(id);
    }
    
    public List<Map<String, Object>> getAllMetadata() {
        List<Document> documents = documentRepository.findAll();
        List<Map<String, Object>> metadata = new ArrayList<>();
        for (Document doc : documents) {
            Map<String, Object> meta = new HashMap<>();
            meta.put("id", doc.getId());
            meta.put("filename", doc.getFilename());
            meta.put("email", doc.getEmail());
            metadata.add(meta);
        }
        return metadata;
    }
    
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }
    
    public Document getDocumentById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));
    }
    
    public List<Document> getDocumentsByEmail(String email) {
        return documentRepository.findByEmail(email);
    }
    
    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }
}