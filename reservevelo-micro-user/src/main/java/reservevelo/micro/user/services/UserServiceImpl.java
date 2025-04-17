package reservevelo.micro.user.services;

import com.mongodb.DuplicateKeyException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import reservevelo.micro.user.models.User;

import reservevelo.micro.user.repos.UserRepo;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService  {
    private final UserRepo userRepo ;





    @Override
    public User saveUser(User user) {
        try {
            log.info("Saving user: {} to db", user.getUserName());
            return userRepo.save(user);
        } catch (DuplicateKeyException e) {
            log.error("Username {} already exists.", user.getUserName());

        }
        return user;
    }





    @Override
    public User getUser(String username) {
        log.info("getting user {}",username);
        return userRepo.findAppUserByUserName(username);
    }

    @Override
    public User getUserById(String id) {
        return userRepo.findById(id).orElse(null);
    }

    @Override
    public List<User> getAllUsers() {
        log.info("getting all users");
        return userRepo.findAll();
    }

}
