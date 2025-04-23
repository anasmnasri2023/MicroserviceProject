package com.esprit.velo.Repository;

import com.esprit.velo.Entity.Association;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssociationRepository extends JpaRepository<Association, Integer> {
}