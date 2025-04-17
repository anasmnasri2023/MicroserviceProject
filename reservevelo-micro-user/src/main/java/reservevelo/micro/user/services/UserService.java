package reservevelo.micro.user.services;

import reservevelo.micro.user.models.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    User getUser(String username);

    User getUserById(String id);

    List<User> getAllUsers();

    List<User> searchUsers(String firstName, String lastName);

    List<User> sortUsers(String field, String order);
}
