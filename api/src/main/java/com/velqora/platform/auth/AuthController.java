package com.velqora.platform.auth;

import com.velqora.platform.auth.dto.AuthResponse;
import com.velqora.platform.auth.dto.LoginRequest;
import com.velqora.platform.security.UserPrincipal;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/me")
    public Map<String, Object> me(Authentication authentication) {
        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();

        return Map.of(
                "id", principal.getId(),
                "email", principal.getEmail(),
                "firstName", principal.getFirstName(),
                "lastName", principal.getLastName(),
                "authorities", principal.getAuthorities()
        );
    }
}