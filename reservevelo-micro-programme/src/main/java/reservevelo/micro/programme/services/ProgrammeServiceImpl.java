package reservevelo.micro.programme.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reservevelo.micro.programme.models.Programme;
import reservevelo.micro.programme.repos.ProgrammeRepo;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ProgrammeServiceImpl implements IProgrammeService {
	
	@Autowired
	ProgrammeRepo programmeBaladeRepo;
	
	@Override
	public List<Programme> getAllProgrammes() {
		return programmeBaladeRepo.findAll();
	}

	@Override
	public Programme addProgramme(Programme programme) {
		return programmeBaladeRepo.save(programme);
	}

	@Override
	public Programme updateProgramme(Programme programmeBalade) {
		return programmeBaladeRepo.save(programmeBalade);
	}

	@Override
	public void deleteProgramme(String id) {
		programmeBaladeRepo.deleteById(id);
	}

}