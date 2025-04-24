package com.example.velorentms.Controller;

import com.example.velorentms.Entity.Velorent;
import com.example.velorentms.Service.VelorentService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/velorent")
@CrossOrigin(origins = "*")
public class VelorentController {

    private final VelorentService velorentService;
    private final RestTemplate restTemplate;
    private final Environment environment;

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

    // ✅ Get by startRentDate
    @GetMapping("/bystartdate")
    public List<Velorent> getVelorentsByStartDate(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return velorentService.getVelorentsByStartDate(date);
    }

    // ✅ Get by endRentDate
    @GetMapping("/byenddate")
    public List<Velorent> getVelorentsByEndDate(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return velorentService.getVelorentsByEndDate(date);
    }

    // ✅ Optional: filter between two dates
    @GetMapping("/bydaterange")
    public List<Velorent> getVelorentsBetweenDates(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end) {
        return velorentService.getVelorentsBetweenDates(start, end);
    }

    @PatchMapping
    public Velorent updateVelorent(@RequestBody Velorent velorent) {
        return velorentService.updateVelorent(velorent);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> cancelVelorent(@PathVariable("id") Long idVelorent) {
        velorentService.cancelVelorent(idVelorent);
        return ResponseEntity.ok("Velorent with id " + idVelorent + " has been deleted.");
    }

    @GetMapping("/user/{userId}")
    public List<Velorent> getVelorentsByUserId(@PathVariable("userId") String userId) {
        restTemplate.getForObject("http://user-service:8094/api/user/" + userId, String.class);
        return velorentService.getVelorentsByUserId(userId);
    }

    @GetMapping("/userInfo/{userId}")
    public User getUserByVeloRent(@PathVariable("userId") String userId) {
        return restTemplate.getForObject("http://user-service:8094/api/user/" + userId, User.class);
    }

    @Data
    public static class User {
        private String id;
        private String firstName;
        private String lastName;
        private String userName;
        private String emailUser;
    }
}
