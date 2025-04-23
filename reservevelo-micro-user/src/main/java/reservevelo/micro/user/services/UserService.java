package reservevelo.micro.user.services;

import reservevelo.micro.user.dtos.LoginRequest;
import reservevelo.micro.user.dtos.LoginResponse;
import reservevelo.micro.user.dtos.RegisterRequest;
import reservevelo.micro.user.dtos.UserDTO;
import reservevelo.micro.user.models.User;

import java.util.List;

public interface UserService {
    // Authentication methods
    UserDTO registerUser(RegisterRequest registerRequest);
    UserDTO createAdminUser(RegisterRequest registerRequest); // New method for explicit admin creation
    LoginResponse authenticateUser(LoginRequest loginRequest);

    // Existing methods
    User saveUser(User user);
    User getUser(String username);
    User getUserById(String id);
    List<User> getAllUsers();
    List<User> searchUsers(String firstName, String lastName);
    List<User> sortUsers(String field, String order);

    // DTO conversion method
    UserDTO convertToDTO(User user);

    // CRUD operations
    UserDTO updateUser(String id, UserDTO userDTO);
    void deleteUser(String id);
}