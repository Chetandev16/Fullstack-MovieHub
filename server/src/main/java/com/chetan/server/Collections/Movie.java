package com.chetan.server.Collections;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

@Document(collection = "movies")
public class Movie {

    public Movie() {
    }

    public Movie(ObjectId id, String imdbId, String title, String realeaseDate, String trailerLink, String poster,
            List<String> genres, List<String> backdrops, List<Review> reviewIds) {
        this.id = id;
        this.imdbId = imdbId;
        this.title = title;
        this.realeaseDate = realeaseDate;
        this.trailerLink = trailerLink;
        this.poster = poster;
        this.genres = genres;
        this.backdrops = backdrops;
        this.reviewIds = reviewIds;
    }

    @Id
    private ObjectId id;
    private String imdbId;
    private String title;
    private String realeaseDate;
    private String trailerLink;
    private String poster;
    private List<String> genres;
    private List<String> backdrops;

    public ObjectId getId() {
        return this.id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getImdbId() {
        return this.imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRealeaseDate() {
        return this.realeaseDate;
    }

    public void setRealeaseDate(String realeaseDate) {
        this.realeaseDate = realeaseDate;
    }

    public String getTrailerLink() {
        return this.trailerLink;
    }

    public void setTrailerLink(String trailerLink) {
        this.trailerLink = trailerLink;
    }

    public String getPoster() {
        return this.poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public List<String> getGenres() {
        return this.genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public List<String> getBackdrops() {
        return this.backdrops;
    }

    public void setBackdrops(List<String> backdrops) {
        this.backdrops = backdrops;
    }

    @DocumentReference
    private List<Review> reviewIds;

    public List<Review> getReviewIds() {
        return this.reviewIds;
    }

    public void setReviewIds(List<Review> reviewIds) {
        this.reviewIds = reviewIds;
    }
}
