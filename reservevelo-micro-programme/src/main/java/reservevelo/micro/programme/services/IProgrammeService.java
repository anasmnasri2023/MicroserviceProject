package reservevelo.micro.programme.services;

import java.util.List;

import reservevelo.micro.programme.models.Programme;


public interface IProgrammeService {
	
	List<Programme> getAllProgrammes();
	Programme addProgramme(Programme programmeBalade);
	Programme updateProgramme(Programme programmeBalade);
	void deleteProgramme(String id);

}
