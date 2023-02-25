package com.chetan.server.MyController;
// import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chetan.server.Collections.User;
import com.chetan.server.MovieServices.RegisterUserService;
// import com.chetan.server.Repository.UserInfoRepo;
import com.chetan.server.MovieServices.jwtService;
import com.chetan.server.Repository.UserInfoRepo;
import com.chetan.server.dto.AuthRequest;

@RestController
@CrossOrigin(origins = {"http://localhost:5173","http://192.168.1.7:5173"})
@RequestMapping("/auth")
public class RegisterController {
    @Autowired
    private RegisterUserService registerUserService;
    @Autowired
    private jwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;
    // @Autowired
    // private PasswordEncoder passwordEncoder;

    @Autowired
    private UserInfoRepo userInfoRepo;
    
    @PostMapping("/register")
    public void register(@RequestBody User user){
        registerUserService.registerUser(user);
    }


    // @GetMapping("/login")
    // public String login(){
    //     return "you are logged in";
    // }

    @PostMapping("/login")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) throws Exception {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(authRequest.getEmail());
        }else{
            throw new UsernameNotFoundException("User not found (or bad password)");
        }
    }
    @GetMapping("/validate/{email}")
    public String login(@PathVariable String email){
        User value = userInfoRepo.findByEmail(email).orElse(null);
        // System.out.println(value);
        if(value != null){
            return "user is present";
        }else{
            return "user is not present";
        }
    }
}
