package com.example.velorentms.Entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "velorent")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class Velorent implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "velo_id")
    private Long veloId;

    @Column(name = "user_id")
    private String userId;

    @Temporal(TemporalType.DATE)
    @Column(name = "start_rent_date")
    private Date startRentDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "end_rent_date")
    private Date endRentDate;

    @Column(name = "from_location")
    private String fromLocation;

    @Column(name = "to_location")
    private String toLocation;


}