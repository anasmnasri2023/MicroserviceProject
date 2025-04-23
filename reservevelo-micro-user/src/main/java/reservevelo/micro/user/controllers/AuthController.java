package reservevelo.micro.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reservevelo.micro.user.dtos.LoginRequest;
import reservevelo.micro.user.dtos.LoginResponse;
import reservevelo.micro.user.dtos.RegisterRequest;
import reservevelo.micro.user.dtos.UserDTO;
import reservevelo.micro.user.services.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody RegisterRequest registerRequest) {
        UserDTO newUser = userService.registerUser(registerRequest);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/register/admin")
    public ResponseEntity<UserDTO> registerAdminUser(@RequestBody RegisterRequest registerRequest) {
        UserDTO newAdmin = userService.createAdminUser(registerRequest);
        return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest loginRequest) {
        LoginResponse response = userService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }
}