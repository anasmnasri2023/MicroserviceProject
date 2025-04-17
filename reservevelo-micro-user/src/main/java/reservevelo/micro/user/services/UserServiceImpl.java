package reservevelo.micro.user.services;

import com.mongodb.DuplicateKeyException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reservevelo.micro.user.models.User;
import reservevelo.micro.user.repos.UserRepo;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;

    @Override
    public User saveUser(User user) {
        try {
            log.info("Saving user: {} to db", user.getUserName());
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
}
