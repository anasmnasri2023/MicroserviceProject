package com.esprit.velo.Repository;

import com.esprit.velo.Entity.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation, Integer> {
}