package com.chetan.server.MovieServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chetan.server.Collections.User;
import com.chetan.server.Repository.UserInfoRepo;

@Service
public class RegisterUserService {
    @Autowired
    private UserInfoRepo userInfoRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userInfoRepo.insert(user);
    }
}
