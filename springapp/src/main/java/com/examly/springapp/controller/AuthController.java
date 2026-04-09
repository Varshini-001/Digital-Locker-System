package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        if (email == null || password == null || email.isBlank() || password.isBlank())
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));

        if (userRepository.findByEmail(email).isPresent())
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));

        userRepository.save(new User(email, password));
        return ResponseEntity.ok(Map.of("message", "Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            String token = jwtUtil.generateToken(email);
            return ResponseEntity.ok(Map.of("token", token));
        }

        return ResponseEntity.badRequest().body(Map.of("error", "Invalid credentials"));
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        boolean isValid = jwtUtil.validateToken(token);
        return ResponseEntity.ok(Map.of("valid", isValid));
    }
}
