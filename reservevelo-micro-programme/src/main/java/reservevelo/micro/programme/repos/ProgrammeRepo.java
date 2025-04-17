package reservevelo.micro.programme.repos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import reservevelo.micro.programme.models.Programme;


@Repository
public interface ProgrammeRepo extends MongoRepository <Programme,String> {
	
	
	Programme findProgrammeBaladeById(String id);


}
