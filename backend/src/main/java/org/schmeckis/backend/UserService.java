package org.schmeckis.backend;


import lombok.RequiredArgsConstructor;
import org.schmeckis.backend.model.User;
import org.schmeckis.backend.repo.UserRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    UserRepo userRepo;

    public void saveUser(User user) {
        userRepo.save(user);
    }

    public User getUser(String username, String password) {
        Optional<User> isUser= userRepo.findByUsernaem(username);
        boolean isPasswordCorrect = isUser.map(user -> user.password().equals(password)).orElse(false);

        if (isPasswordCorrect) {
            return isUser.get();
        }
        else throw new IllegalArgumentException("Password is not correct");
    }

}
