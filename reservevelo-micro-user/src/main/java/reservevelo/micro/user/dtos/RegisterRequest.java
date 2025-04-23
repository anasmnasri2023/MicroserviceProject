package reservevelo.micro.user.dtos;

import lombok.Data;

@Data
public class RegisterRequest {
    private String userName;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}