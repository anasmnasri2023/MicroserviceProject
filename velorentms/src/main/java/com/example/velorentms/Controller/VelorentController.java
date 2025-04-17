package com.example.velorentms.Controller;

import com.example.velorentms.Entity.Velorent;
import com.example.velorentms.Service.VelorentService;

import com.example.velorentms.Entity.Velorent;
import com.example.velorentms.Service.VelorentService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/velorent")
@CrossOrigin(origins = "*")
public class VelorentController {

    public VelorentService velorentService;
    public RestTemplate restTemplate;
    private Environment environment;
    @Autowired
    public VelorentController(VelorentService velorentService, RestTemplate restTemplate, Environment environment) {
        this.velorentService = velorentService;
        this.restTemplate = restTemplate;
        this.environment = environment;
    }

    @PostMapping
    public Velorent rentVelorent(@RequestBody Velorent velorent) {
        return velorentService.rentVelorent(velorent);
    }
    @GetMapping("/{id}")
    public Optional<Velorent> getVelorent(@PathVariable("id") Long idVelorent) {
        return velorentService.getVelorent(idVelorent);
    }
    @GetMapping("/all")
    public List<Velorent> getAllVelorent() {
        return velorentService.getAllVelorent();
    }

    @GetMapping("/bystartdate")
    public List<Velorent> getVelorentsByStartDate(@RequestBody Date date) {
        return velorentService.getVelorentsByDate(date);
    }
    @GetMapping("/byenddate")
    public List<Velorent> getVelorentsByendDate(@RequestBody Date date) {
        return velorentService.getVelorentsByDate(date);
    }
    @PatchMapping
    public Velorent updateVelorent(Velorent velorent) {
        return velorentService.updateVelorent(velorent);
    }

    @DeleteMapping
    public void cancelVelorent(Long idVelorent) {
        velorentService.cancelVelorent(idVelorent);
    }

    @GetMapping("/user/{userId}")
    public List<Velorent> getVelorentsByuserId(@PathVariable("userId") String userId){


        String result = restTemplate.getForObject("http://user-service:8098/api/user/"+userId, String.class);


        return velorentService.getVelorentsByuserId(userId);
    }
    @GetMapping("/userInfo/{userId}")
    public User getUserByveloRent(@PathVariable("userId") String userId){


        User result = restTemplate.getForObject("http://user-service:8098/api/user/"+userId, User.class);


        return result;
    }
    @Data
    public static class User {
        private String id ;
        private String firstName ;
        private String lastName ;
        private String userName ;

    }
}
