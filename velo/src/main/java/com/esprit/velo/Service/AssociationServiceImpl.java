package com.esprit.velo.Service;

import com.esprit.velo.Entity.Association;
import com.esprit.velo.Repository.AssociationRepository;
import com.esprit.velo.Repository.ReclamationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AssociationServiceImpl implements AssociationService{
    @Autowired
    private AssociationRepository associationRepository;


    @Override
    public List<Association> getAllAssociations() {
        return associationRepository.findAll();
    }

    @Override
    public Association getAssociationById(int idRec) {
        return associationRepository.findById(idRec).orElse(null);
    }

    @Override
    public Association addAssociation(Association Association) {
        return associationRepository.save(Association);
    }

    @Override
    public Association updateAssociation(Association Associations,int idAss) {
        Association association=associationRepository.findById(idAss).orElse(null);
        if(Associations.getAdresse()!=null)association.setAdresse(Associations.getAdresse());
        if(Associations.getDescription()!=null)association.setDescription(Associations.getDescription());
        if(Associations.getEmail()!=null)association.setEmail(Associations.getEmail());
        if(Associations.getPhone()!=0)association.setPhone(Associations.getPhone());
        if(Associations.getName()!=null)association.setName(Associations.getName());
        return associationRepository.save(association);
    }

    @Override
    public void deleteAssociation(int idRec) {
        associationRepository.deleteById(idRec);
    }

    @Override
    public void deleteAllAssociations() {
        associationRepository.deleteAll();
    }
}
