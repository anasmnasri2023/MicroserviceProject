package reservevelo.micro.user.dtos;

import lombok.Data;

@Data
public class LoginRequest {
    private String userName;  // Could be username or email
    private String password;
}