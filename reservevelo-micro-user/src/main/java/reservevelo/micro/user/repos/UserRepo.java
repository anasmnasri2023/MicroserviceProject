package reservevelo.micro.user.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import reservevelo.micro.user.models.User;

import java.util.List;

@Repository
public interface UserRepo extends MongoRepository<User, String> {

    User findAppUserByUserName(String userName);

    boolean existsByUserName(String username);

    // Recherche dynamique par prénom et nom
    List<User> findByFirstNameContainingAndLastNameContaining(String firstName, String lastName);

    // Recherche avec tri et pagination
    Page<User> findAllByOrderByUserNameAsc(Pageable pageable);

    Page<User> findAllByOrderByUserNameDesc(Pageable pageable);

    // Recherche par nom d'utilisateur
    List<User> findByUserNameContaining(String userName);
}
