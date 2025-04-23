package com.esprit.velo.Service;

import com.esprit.velo.Entity.Association;

import java.util.List;

public interface AssociationService {
    List<Association> getAllAssociations();

    Association getAssociationById(int idRec);
    Association addAssociation(Association Association);
    Association updateAssociation(Association Association,int idAss);
    void deleteAssociation(int idRec);
    void deleteAllAssociations();
}
