package reservevelo.micro.programme.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reservevelo.micro.programme.models.Programme;
import reservevelo.micro.programme.services.IProgrammeService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/prog")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProgrammeController {
	
	@Autowired
	IProgrammeService programmeService;
	
	@GetMapping("/all")
    public ResponseEntity<List<Programme>> getProgs(){
        return ResponseEntity.ok().body(programmeService.getAllProgrammes());
    }

    @PostMapping("/save")
    public ResponseEntity<Programme>addProg(@RequestBody Programme programme){
        return ResponseEntity.ok().body(programmeService.addProgramme(programme));
    }
    
    @PutMapping("/update")
    public ResponseEntity<Programme>updateProg(@RequestBody Programme programme){
        return ResponseEntity.ok().body(programmeService.updateProgramme(programme));
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Programme>deleteProg(@PathVariable(value = "id") String id){
    	programmeService.deleteProgramme(id);
        return ResponseEntity.ok().build();
    }


}
