package reservevelo.micro.balade.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reservevelo.micro.balade.models.Balade;
import reservevelo.micro.balade.repos.BaladeRepo;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BaladeServiceImpl implements BaladeService {
	
	@Autowired
	BaladeRepo baladeRepo;

	
	@Override
	public List<Balade> getAllBalades() {
		return baladeRepo.findAll();
	}

	@Override
	public Balade addBalade(Balade balade, String pgId) {
		//ProgrammeBalade pg = programmeBaladeRepo.findProgrammeBaladeById(pgId);
		//balade.setProgrammeBalade(pg);
		return baladeRepo.save(balade);
	}

	@Override
	public Balade updateBalade(Balade balade) {
		return baladeRepo.save(balade);
	}

	@Override
	public void deleteBalade(String id) {
		baladeRepo.deleteById(id);
		
	}

}
