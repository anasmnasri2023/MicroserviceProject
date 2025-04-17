package reservevelo.micro.user.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import reservevelo.micro.user.models.User;
import reservevelo.micro.user.services.UserService;

import java.net.URI;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@Slf4j
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String userId) {
        return ResponseEntity.ok().body(userService.getUserById(userId));
    }

    @PostMapping("/user/save")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @GetMapping("/user/username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUser(username));
    }

    @GetMapping("/user/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam(required = false) String firstName,
                                                  @RequestParam(required = false) String lastName) {
        return ResponseEntity.ok(userService.searchUsers(firstName, lastName));
    }

    @GetMapping("/user/sorted")
    public ResponseEntity<List<User>> sortUsers(@RequestParam(defaultValue = "userName") String field,
                                                @RequestParam(defaultValue = "asc") String order) {
        return ResponseEntity.ok(userService.sortUsers(field, order));
    }
}