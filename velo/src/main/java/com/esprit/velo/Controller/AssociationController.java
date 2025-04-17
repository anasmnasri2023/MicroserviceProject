package com.esprit.velo.Controller;


import com.esprit.velo.Entity.Association;
import com.esprit.velo.Service.AssociationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@RestController
@RequestMapping("Association")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AssociationController {
    @Autowired
    private AssociationService associationService;

    @GetMapping("/All")

    public List<Association> getAllAssociation(){


            return associationService.getAllAssociations();

    }

    @GetMapping("/{id}")
    public Association getAssociationByid(@PathVariable int id){
        return associationService.getAssociationById(id);
    }

    @PostMapping("/add")

    public Association addAssociation(@RequestBody Association Association){
        return associationService.addAssociation(Association);
    }

    @PutMapping("/update/{idAss}")
    public Association updateAssociation(@RequestBody Association Association,@PathVariable int idAss){
        return associationService.updateAssociation(Association,idAss);
    }

    @DeleteMapping("/all")
    public String deleteAll(){
        associationService.deleteAllAssociations();
        return "All Associations deleted !!";
    }

    @DeleteMapping("/{id}")
    public String deleletById(@PathVariable int id){
        associationService.deleteAssociation(id);
        return "Association id: "+id+" Has been deleted";
    }

}
