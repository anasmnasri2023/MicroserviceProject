package com.example.velorentms.Service;

import com.example.velorentms.Entity.Velorent;
import com.example.velorentms.Repository.VelorentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class VelorentService {

    private final VelorentRepository velorentRepository;

    @Autowired
    public VelorentService(VelorentRepository velorentRepository) {
        this.velorentRepository = velorentRepository;
    }

    public Velorent rentVelorent(Velorent velorent) {
        return velorentRepository.save(velorent);
    }

    public Optional<Velorent> getVelorent(Long idVelorent) {
        return velorentRepository.findById(idVelorent);
    }

    public List<Velorent> getAllVelorent() {
        return velorentRepository.findAll();
    }

    public Velorent updateVelorent(Velorent velorent) {
        return velorentRepository.saveAndFlush(velorent);
    }

    public void cancelVelorent(Long idVelorent) {
        velorentRepository.deleteById(idVelorent);
    }

    public List<Velorent> getVelorentsByUserId(String userId) {
        return velorentRepository.findByUserId(userId);
    }

    public List<Velorent> getVelorentsByStartDate(Date date) {
        return velorentRepository.findByStartRentDate(date);
    }

    public List<Velorent> getVelorentsByEndDate(Date date) {
        return velorentRepository.findByEndRentDate(date);
    }

    public List<Velorent> getVelorentsBetweenDates(Date startDate, Date endDate) {
        return velorentRepository.findByStartRentDateBetween(startDate, endDate);
    }

}
