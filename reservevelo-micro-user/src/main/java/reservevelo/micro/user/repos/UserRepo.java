package reservevelo.micro.user.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import reservevelo.micro.user.models.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<User, String> {

    User findAppUserByUserName(String userName);  // Keep your existing method

    boolean existsByUserName(String username);
    boolean existsByEmail(String email);  // Add this method for email validation

    // Your existing methods
    List<User> findByFirstNameContainingAndLastNameContaining(String firstName, String lastName);
    Page<User> findAllByOrderByUserNameAsc(Pageable pageable);
    Page<User> findAllByOrderByUserNameDesc(Pageable pageable);
    List<User> findByUserNameContaining(String userName);

    // Additional method for email lookups
    User findByEmail(String email);
}