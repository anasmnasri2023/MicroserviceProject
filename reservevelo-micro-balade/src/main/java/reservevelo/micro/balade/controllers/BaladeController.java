package reservevelo.micro.balade.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reservevelo.micro.balade.models.Balade;
import reservevelo.micro.balade.services.BaladeService;

@RestController
@RequestMapping("/balade")
public class BaladeController {
	
	@Autowired
	BaladeService baladeService;
	
	@GetMapping("")
    public ResponseEntity<List<Balade>> getBalades(){
        return ResponseEntity.ok().body(baladeService.getAllBalades());
    }

    @PostMapping("/save/{pgId}")
    public ResponseEntity<Balade>addBalade(@RequestBody Balade balade, @PathVariable(value = "pgId") String pgId){
        return ResponseEntity.ok().body(baladeService.addBalade(balade,pgId));
    }
    
    @PutMapping("/update")
    public ResponseEntity<Balade>updateBalade(@RequestBody Balade balade){
        return ResponseEntity.ok().body(baladeService.updateBalade(balade));
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Balade>deleteBalade(@PathVariable(value = "id") String id){
    	baladeService.deleteBalade(id);
        return ResponseEntity.ok().build();
    }

}
