package reservevelo.micro.programme.models;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "programmeBalade")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Programme {
	@Id

    private String id ;
	private String startingPoint ;
	private String departureTime ;
	private String remarks ;
	
	private List<Activities> activities ;
	

}