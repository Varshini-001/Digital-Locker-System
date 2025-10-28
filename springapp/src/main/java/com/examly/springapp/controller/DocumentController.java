package com.examly.springapp.controller;

import com.examly.springapp.model.Document;
import com.examly.springapp.service.DocumentService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(originPatterns = "*")
public class DocumentController {
    
    private final DocumentService documentService;
    
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }
    
    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "email", required = false) String email) {
        
        try {
            Document savedDocument = documentService.uploadDocument(file, email);
            return ResponseEntity.ok("Document uploaded successfully with ID: " + savedDocument.getId());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading document: " + e.getMessage());
        }
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<Document>> getAllDocuments() {
        List<Document> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }
    
    @GetMapping("/view/{id}")
    public ResponseEntity<byte[]> viewDocument(@PathVariable Long id) {
        try {
            Document document = documentService.getDocumentById(id);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("inline", document.getFilename());
            return ResponseEntity.ok().headers(headers).body(document.getFileData());
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long id) {
        try {
            documentService.deleteDocument(id);
            return ResponseEntity.ok("Document deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Document not found");
        }
    }
}