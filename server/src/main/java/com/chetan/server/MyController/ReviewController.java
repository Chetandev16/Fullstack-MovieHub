package com.chetan.server.MyController;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chetan.server.Collections.Review;
import com.chetan.server.MovieServices.ReviewService;

@RestController
@RequestMapping("/api/movies/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    
    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Map<String,String> payload) {
        return new ResponseEntity<Review>(reviewService.createReview(payload.get("imdbId"),payload.get("reviewBody")), HttpStatus.OK);
    }
}
