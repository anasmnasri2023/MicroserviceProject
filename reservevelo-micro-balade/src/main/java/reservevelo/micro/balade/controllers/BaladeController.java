package reservevelo.micro.balade.controllers;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reservevelo.micro.balade.models.Balade;
import reservevelo.micro.balade.services.BaladeService;
import reservevelo.micro.balade.services.PdfGeneratorService;

@RestController
@RequestMapping("/balade")
public class BaladeController {
	
	@Autowired
	BaladeService baladeService;

    @Autowired
    PdfGeneratorService pdfService;

    @GetMapping("")
    public ResponseEntity<List<Balade>> getBalades(){
        return ResponseEntity.ok().body(baladeService.getAllBalades());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Balade> getBaladeById(@PathVariable String id) {
        Optional<Balade> balade = baladeService.getBaladeById(id);
        return balade.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PostMapping("/save/{pgId}")
    public ResponseEntity<Balade>addBalade(@RequestBody Balade balade, @PathVariable(value = "pgId") String pgId){
        return ResponseEntity.ok().body(baladeService.addBalade(balade,pgId));
    }
    
    @PutMapping("/update")
    public ResponseEntity<Balade>updateBalade(@RequestBody Balade balade){
        return ResponseEntity.ok().body(baladeService.updateBalade(balade));
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Balade>deleteBalade(@PathVariable(value = "id") String id){
    	baladeService.deleteBalade(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/export/pdf")
    public ResponseEntity<byte[]> exportBaladesToPdf() {
        List<Balade> balades = baladeService.getAllBalades();
        ByteArrayInputStream bis = pdfService.generateBaladesPdf(balades);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=balades.pdf")
                .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                .body(convertToByteArray(bis));
    }

    // Compatible Java 8
    private byte[] convertToByteArray(ByteArrayInputStream bis) {
        byte[] buffer = new byte[1024];
        int nRead;
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            while ((nRead = bis.read(buffer, 0, buffer.length)) != -1) {
                baos.write(buffer, 0, nRead);
            }
            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la conversion du flux PDF", e);
        }
    }


}
