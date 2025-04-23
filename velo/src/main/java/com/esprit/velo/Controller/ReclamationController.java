package com.esprit.velo.Controller;


import com.esprit.velo.Entity.Reclamation;
import com.esprit.velo.Service.ReclamastionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Reclamation")
public class ReclamationController {
    @Autowired
    private ReclamastionService reclamastionService;


    @GetMapping("All")
    public List<Reclamation> getAllReclamation(){
        return reclamastionService.getAllReclamations();
    }

    @GetMapping("/{id}")
    public Reclamation getReclamationByid(@PathVariable int id){
        return reclamastionService.getReclamationById(id);
    }

    @PostMapping("/add/{idAssociation}")
    public Reclamation addReclamation(@RequestBody Reclamation reclamation ,@PathVariable int idAssociation){
        return reclamastionService.addReclamationAndAssignToAssociation(reclamation,idAssociation);
    }

    @PutMapping("/update/{idRec}")
    public Reclamation updateReclamation(@RequestBody Reclamation reclamation,@PathVariable int idRec){
        return reclamastionService.updateReclamation(reclamation,idRec);
    }

    @DeleteMapping("/all")
    public String deleteAll(){
         reclamastionService.deleteAllReclamations();
        return "All Reclamations deleted !!";
    }

    @DeleteMapping("/{id}")
    public String deleletById(@PathVariable int id){
        reclamastionService.deleteReclamation(id);
        return "Reclamation id: "+id+" Has been deleted";
    }
}
