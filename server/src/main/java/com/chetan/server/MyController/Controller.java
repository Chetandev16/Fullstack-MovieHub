package com.chetan.server.MyController;

import java.util.List;
import java.util.Optional;

import com.chetan.server.Collections.Movie;
import com.chetan.server.MovieServices.MovieService;


import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@PreAuthorize("hasAuthority('ROLE_USER')")
@CrossOrigin(origins = {"http://localhost:5173","http://192.168.1.7:5173","https://moviehubbychetan.netlify.app"})
@RequestMapping("/api/movies") 
public class Controller {
    @Autowired
    private MovieService movieServices;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome to Movie API";
    }

    @GetMapping("/allmovies")
    public ResponseEntity<List<Movie>> getallmovies() {
        return new ResponseEntity<List<Movie>>(movieServices.allmovies(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Movie>> getMovieById(@PathVariable("id") ObjectId id) {
        return new ResponseEntity<Optional<Movie>>(movieServices.getMovieById(id),HttpStatus.OK);
    }

    @GetMapping("/imdb/{imdbid}")
    public ResponseEntity<Optional<Movie>> getMovieByImdbId(@PathVariable("imdbid") String imdbid) {
        return new ResponseEntity<Optional<Movie>>(movieServices.getMovieByImdbId(imdbid),HttpStatus.OK);
    }
}
