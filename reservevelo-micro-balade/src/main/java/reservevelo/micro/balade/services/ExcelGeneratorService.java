package reservevelo.micro.balade.services;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import reservevelo.micro.balade.models.Balade;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelGeneratorService {

    public ByteArrayInputStream generateBaladesExcel(List<Balade> balades) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Balades");

            // 🟡 En-têtes
            Row headerRow = sheet.createRow(0);
            String[] headers = {"ID", "Titre", "Description", "Lieu", "Date", "Durée (min)"};
            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                CellStyle style = workbook.createCellStyle();
                Font font = workbook.createFont();
                font.setBold(true);
                style.setFont(font);
                cell.setCellStyle(style);
            }

            // 🟢 Données
            int rowIdx = 1;
            for (Balade b : balades) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(b.getId());
                row.createCell(1).setCellValue(b.getTitle());
                row.createCell(2).setCellValue(b.getDescription());
                row.createCell(3).setCellValue(b.getLocation());
                row.createCell(4).setCellValue(b.getDate().toString());
                row.createCell(5).setCellValue(b.getDuration());
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());

        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de la génération Excel : " + e.getMessage(), e);
        }
    }
}
