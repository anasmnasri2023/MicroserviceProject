package reservevelo.micro.user.services;

import java.util.List;


import reservevelo.micro.user.models.User;

public interface UserService {

    User saveUser (User user );

    User getUser (String username);
    User getUserById (String id);
    List<User> getAllUsers();
    
    
 }
