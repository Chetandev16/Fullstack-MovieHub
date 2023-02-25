package com.chetan.server.MyController;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chetan.server.Collections.Review;
import com.chetan.server.MovieServices.ReviewService;

@RestController
@PreAuthorize("hasAuthority('ROLE_USER')")
@CrossOrigin(origins = {"http://localhost:5173","http://192.168.1.7:5173","https://moviehubbychetan.netlify.app"})
@RequestMapping({"/api/movies/reviews","https://moviehubbychetan.netlify.app"})
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    
    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        return new ResponseEntity<Review>(reviewService.createReview(review.getImdbId(),review.getName(),review.getBody()), HttpStatus.OK);
    }
}
