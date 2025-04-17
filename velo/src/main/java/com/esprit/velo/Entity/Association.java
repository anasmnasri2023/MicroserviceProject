package com.esprit.velo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Association {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String adresse;

    private int phone;

    private String description;

    private String email;

    @OneToMany(mappedBy = "association",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Reclamation> reclamation;






}