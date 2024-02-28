package org.schmeckis.backend.UnitTest;


import org.schmeckis.backend.repo.UserRepo;
import org.schmeckis.backend.service.UserService;

import static org.mockito.Mockito.mock;

public class UserServiceTest {

    private final UserRepo userRepo = mock(UserRepo.class);

    private UserService userService = new UserService(userRepo);

    void loadUserByUsernameTest() {
        //ARRANGE

        //ACT
        //ASSERT
    }
}
