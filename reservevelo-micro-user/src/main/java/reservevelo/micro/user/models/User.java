package reservevelo.micro.user.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String userName;
    private String email;  // Added for account recovery and notifications
    private String password;  // Needed for authentication
    private UserRole role = UserRole.USER;  // For role-based access control
    private boolean enabled = true;  // Account status
}