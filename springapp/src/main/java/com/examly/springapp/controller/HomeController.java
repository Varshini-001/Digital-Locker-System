package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    
    @GetMapping("/api")
    public String apiRoot() {
        return "Document Management API is running. Available endpoints: /api/documents/upload, /api/documents/list";
    }
}