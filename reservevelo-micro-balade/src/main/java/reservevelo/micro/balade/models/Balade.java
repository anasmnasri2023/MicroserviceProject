package reservevelo.micro.balade.models;

import java.util.Collection;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "balade")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Balade {
	
    @Id

    private String id ;
    private String title;
    private String description;
    private String location;
    private Date date;
    private int duration;
    
    private int programmeBalade;

}
