package reservevelo.micro.balade.services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.stereotype.Service;
import reservevelo.micro.balade.models.Balade;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Stream;


@Service
public class PdfGeneratorService {

    public ByteArrayInputStream generateBaladesPdf(List<Balade> balades) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Liste des Balades", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{3, 4, 3, 2, 2});

            Stream.of("Titre", "Description", "Lieu", "Date", "Durée (min)").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
                header.setPhrase(new Phrase(headerTitle, headFont));
                table.addCell(header);
            });

            for (Balade b : balades) {
                table.addCell(b.getTitle());
                table.addCell(b.getDescription());
                table.addCell(b.getLocation());
                table.addCell(String.valueOf(b.getDate()));
                table.addCell(String.valueOf(b.getDuration()));
            }

            document.add(table);
            document.close();

        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}