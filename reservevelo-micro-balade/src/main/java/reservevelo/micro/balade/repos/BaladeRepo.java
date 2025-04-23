package reservevelo.micro.balade.repos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import reservevelo.micro.balade.models.Balade;


@Repository
public interface BaladeRepo extends MongoRepository <Balade,String> {

}
