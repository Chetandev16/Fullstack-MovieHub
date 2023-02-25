package com.chetan.server.Collections;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reviews")
public class Review {


    public Review(String imdbId,String name,String body) {
        this.imdbId = imdbId;
        this.name = name;
        this.body = body;
    }
    

    public Review() {
    }

    @Id
    private ObjectId id;
    private String imdbId;
    private String name;
    private String body;

    public String getImdbId() {
        return this.imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public ObjectId getId() {
        return this.id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBody() {
        return this.body;
    }

    public void setBody(String body) {
        this.body = body;
    }


}
