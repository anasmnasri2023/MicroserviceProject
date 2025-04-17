package com.esprit.velo.Service;

import com.esprit.velo.Entity.Reclamation;

import java.util.List;

public interface ReclamastionService {
    List<Reclamation> getAllReclamations();

    Reclamation getReclamationById(int idRec);
    Reclamation addReclamationAndAssignToAssociation(Reclamation reclamation ,int idAssociation);
    Reclamation updateReclamation(Reclamation reclamation, int idRec);
    void deleteReclamation(int idRec);
    void deleteAllReclamations();

}
