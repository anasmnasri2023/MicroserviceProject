package reservevelo.micro.balade.services;

import java.util.List;
import java.util.Optional;

import reservevelo.micro.balade.models.Balade;

public interface BaladeService {
	
	List<Balade> getAllBalades();
	Optional<Balade> getBaladeById(String id);
	Balade addBalade(Balade balade,String pgId);
	Balade updateBalade(Balade balade);
	void deleteBalade(String id);

}
