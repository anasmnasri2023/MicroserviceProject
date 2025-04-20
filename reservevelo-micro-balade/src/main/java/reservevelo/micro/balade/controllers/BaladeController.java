package reservevelo.micro.balade.controllers;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import reservevelo.micro.balade.models.Balade;
import reservevelo.micro.balade.services.BaladeService;
import reservevelo.micro.balade.services.ExcelGeneratorService;
import reservevelo.micro.balade.services.PdfGeneratorService;
import reservevelo.micro.balade.services.QRCodeService;

@RestController
@RequestMapping("/balade")
public class BaladeController {

    @Autowired
    BaladeService baladeService;

    @Autowired
    PdfGeneratorService pdfService;

    @Autowired
    QRCodeService qrCodeService;
    @Autowired
    ExcelGeneratorService excelService;


    @GetMapping("")
    public ResponseEntity<List<Balade>> getBalades() {
        return ResponseEntity.ok().body(baladeService.getAllBalades());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Balade> getBaladeById(@PathVariable String id) {
        Optional<Balade> balade = baladeService.getBaladeById(id);
        return balade.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/save/{pgId}")
    public ResponseEntity<Balade> addBalade(@RequestBody Balade balade, @PathVariable(value = "pgId") String pgId) {
        return ResponseEntity.ok().body(baladeService.addBalade(balade, pgId));
    }

    @PutMapping("/update")
    public ResponseEntity<Balade> updateBalade(@RequestBody Balade balade) {
        return ResponseEntity.ok().body(baladeService.updateBalade(balade));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Balade> deleteBalade(@PathVariable(value = "id") String id) {
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

    // 🎯 Nouveau endpoint QRCode par ID
    @GetMapping(value = "/qrcode/{id}", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> generateQRCode(@PathVariable String id) {
        Optional<Balade> baladeOpt = baladeService.getBaladeById(id);
        if (!baladeOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Balade b = baladeOpt.get();
        String qrContent = "Titre: " + b.getTitle() +
                "\nDescription: " + b.getDescription() +
                "\nLieu: " + b.getLocation() +
                "\nDate: " + b.getDate() +
                "\nDurée: " + b.getDuration() + " min";

        try {
            byte[] qrImage = qrCodeService.generateQRCodeImage(qrContent, 200, 200);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(qrImage);
        } catch (WriterException | IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/export/excel")
    public ResponseEntity<byte[]> exportBaladesToExcel() {
        List<Balade> balades = baladeService.getAllBalades();
        ByteArrayInputStream bis = excelService.generateBaladesExcel(balades);

        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=balades.xlsx")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
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
