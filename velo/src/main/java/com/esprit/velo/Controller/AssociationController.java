package com.esprit.velo.Controller;


import com.esprit.velo.Entity.Association;
import com.esprit.velo.Service.AssociationService;

import com.esprit.velo.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("Association")
public class AssociationController {
    @Autowired
    private AssociationService associationService;

    @Autowired
    private NotificationService notificationService;

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
        try {
            Association saved = associationService.addAssociation(Association);
            notificationService.notify("New association added: " + Association.getName());
            return saved;
        } catch (Exception e) {
            e.printStackTrace(); // À retirer en production
            throw e;
        }
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
