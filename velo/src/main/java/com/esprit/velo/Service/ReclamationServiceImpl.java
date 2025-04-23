package com.esprit.velo.Service;

import com.esprit.velo.Entity.Association;
import com.esprit.velo.Entity.Reclamation;
import com.esprit.velo.Repository.AssociationRepository;
import com.esprit.velo.Repository.ReclamationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReclamationServiceImpl implements ReclamastionService{
    @Autowired
    private ReclamationRepository reclamationRepository;

    @Autowired
    private AssociationRepository associationRepository;

    @Override
    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    @Override
    public Reclamation getReclamationById(int idRec) {
        return reclamationRepository.findById(idRec).orElse(null);
    }

    @Override
    public Reclamation addReclamationAndAssignToAssociation(Reclamation reclamation, int idAssociation) {
        Association association=associationRepository.findById(idAssociation).orElse(null);
        reclamation.setAssociation(association);
        return reclamationRepository.save(reclamation);
    }

    @Override
    public Reclamation updateReclamation(Reclamation reclamation, int idRec) {
        Reclamation reclamation1=reclamationRepository.findById(idRec).orElse(null);
        if(reclamation.getAssociation()!=null) reclamation1.setAssociation(reclamation.getAssociation());
        if(reclamation.getDate()!=null)reclamation1.setDate(reclamation.getDate());
        if(reclamation.getDescription()!=null)reclamation1.setDescription(reclamation.getDescription());
        if(reclamation.getPriority()!=null)reclamation1.setPriority(reclamation.getPriority());
        if(reclamation.getSubject()!=null)reclamation1.setSubject(reclamation.getSubject());
        if(reclamation.getStatus()!=null)reclamation1.setStatus(reclamation.getStatus());
        return reclamationRepository.save(reclamation1);
    }

    @Override
    public void deleteReclamation(int idRec) {
        reclamationRepository.deleteById(idRec);
    }

    @Override
    public void deleteAllReclamations() {
        reclamationRepository.deleteAll();
    }
}
