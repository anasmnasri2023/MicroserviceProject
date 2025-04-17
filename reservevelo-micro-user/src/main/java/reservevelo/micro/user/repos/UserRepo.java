package reservevelo.micro.user.repos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import reservevelo.micro.user.models.User;

@Repository
public interface UserRepo extends MongoRepository <User,String> {

    User findAppUserByUserName(String userName);
    
    boolean existsByUserName(String username);
}
