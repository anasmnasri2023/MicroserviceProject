package reservevelo.micro.user.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import reservevelo.micro.user.models.UserRole;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String id;
    private String userName;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole role;
}