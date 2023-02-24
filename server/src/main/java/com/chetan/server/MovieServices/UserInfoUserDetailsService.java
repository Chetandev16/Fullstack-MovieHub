package com.chetan.server.MovieServices;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import com.chetan.server.Collections.User;
import com.chetan.server.Repository.UserInfoRepo;
import com.chetan.server.config.UserInfoUserDetails;


@Component
public class UserInfoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserInfoRepo userInfoRepo;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       Optional<User> user = userInfoRepo.findByEmail(email);
       return user.map(UserInfoUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
