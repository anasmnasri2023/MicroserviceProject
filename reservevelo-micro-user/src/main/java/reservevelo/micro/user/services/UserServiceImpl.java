package reservevelo.micro.user.services;

import com.mongodb.DuplicateKeyException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reservevelo.micro.user.config.JwtUtils;
import reservevelo.micro.user.dtos.LoginRequest;
import reservevelo.micro.user.dtos.LoginResponse;
import reservevelo.micro.user.dtos.RegisterRequest;
import reservevelo.micro.user.dtos.UserDTO;
import reservevelo.micro.user.models.User;
import reservevelo.micro.user.models.UserRole;
import reservevelo.micro.user.repos.UserRepo;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Autowired
    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    // Implement UserDetailsService method
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findAppUserByUserName(username);

        if (user == null) {
            user = userRepo.findByEmail(username);
        }

        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        // Convert User to UserDetails
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));

        return new org.springframework.security.core.userdetails.User(
                user.getUserName(),
                user.getPassword(),
                authorities
        );
    }
    @Override
    public UserDTO registerUser(RegisterRequest registerRequest) {
        // Check if username or email already exists
        if (userRepo.existsByUserName(registerRequest.getUserName())) {
            throw new RuntimeException("Username already registered");
        }

        if (userRepo.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setUserName(registerRequest.getUserName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());

        // Get current user count and log it
        long userCount = userRepo.count();
        log.info("Current user count before registration: {}", userCount);

        // Set admin role for the first registered user
        if (userCount == 0) {
            log.info("Setting ADMIN role for first user: {}", registerRequest.getUserName());
            user.setRole(UserRole.ADMIN);
        } else {
            log.info("Setting USER role for: {}", registerRequest.getUserName());
            user.setRole(UserRole.USER);
        }

        User savedUser = userRepo.save(user);
        log.info("User saved with role: {}", savedUser.getRole());
        return convertToDTO(savedUser);
    }

    @Override
    public UserDTO createAdminUser(RegisterRequest registerRequest) {
        // Check if username or email already exists
        if (userRepo.existsByUserName(registerRequest.getUserName())) {
            throw new RuntimeException("Username already registered");
        }

        if (userRepo.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new admin user
        User user = new User();
        user.setUserName(registerRequest.getUserName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());

        // Explicitly set ADMIN role regardless of user count
        user.setRole(UserRole.ADMIN);

        log.info("Creating admin user: {}", registerRequest.getUserName());

        User savedUser = userRepo.save(user);
        return convertToDTO(savedUser);
    }

    @Override
    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        // Find user by username
        User user = userRepo.findAppUserByUserName(loginRequest.getUserName());

        // If user not found by username, try email
        if (user == null) {
            user = userRepo.findByEmail(loginRequest.getUserName());
        }

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Verify password
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate real JWT token
        String token = jwtUtils.generateToken(user);

        log.info("User authenticated successfully: {}", loginRequest.getUserName());
        log.info("User role: {}", user.getRole());
        log.info("JWT token generated with expiration time: 1 hour");

        return new LoginResponse(token, convertToDTO(user));
    }

    @Override
    public User saveUser(User user) {
        try {
            log.info("Saving user: {} to db", user.getUserName());

            // If the user is new and has a password that's not encrypted
            if (user.getId() == null && user.getPassword() != null &&
                    !user.getPassword().startsWith("$2a$")) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }

            return userRepo.save(user);
        } catch (DuplicateKeyException e) {
            log.error("Username {} already exists.", user.getUserName());
        }
        return user;
    }

    @Override
    public User getUser(String username) {
        log.info("getting user {}", username);
        return userRepo.findAppUserByUserName(username);
    }

    @Override
    public User getUserById(String id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        log.info("getting all users");
        return userRepo.findAll();
    }

    @Override
    public UserDTO updateUser(String id, UserDTO userDTO) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUserName(userDTO.getUserName());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        if (userDTO.getRole() != null) {
            user.setRole(userDTO.getRole());
        }

        User updatedUser = userRepo.save(user);
        return convertToDTO(updatedUser);
    }

    @Override
    public void deleteUser(String id) {
        if (!userRepo.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepo.deleteById(id);
    }

    @Override
    public List<User> searchUsers(String firstName, String lastName) {
        return userRepo.findAll().stream()
                .filter(u -> (firstName == null || u.getFirstName().equalsIgnoreCase(firstName)) &&
                        (lastName == null || u.getLastName().equalsIgnoreCase(lastName)))
                .collect(Collectors.toList());
    }

    @Override
    public List<User> sortUsers(String field, String order) {
        List<User> users = userRepo.findAll();
        Comparator<User> comparator;

        switch (field) {
            case "firstName":
                comparator = Comparator.comparing(User::getFirstName, String.CASE_INSENSITIVE_ORDER);
                break;
            case "lastName":
                comparator = Comparator.comparing(User::getLastName, String.CASE_INSENSITIVE_ORDER);
                break;
            default:
                comparator = Comparator.comparing(User::getUserName, String.CASE_INSENSITIVE_ORDER);
        }

        if ("desc".equalsIgnoreCase(order)) {
            comparator = comparator.reversed();
        }

        return users.stream().sorted(comparator).collect(Collectors.toList());
    }

    @Override
    public UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUserName(user.getUserName());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setRole(user.getRole());
        return dto;
    }
}