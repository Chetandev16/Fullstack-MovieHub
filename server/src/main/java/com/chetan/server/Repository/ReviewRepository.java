package com.chetan.server.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.chetan.server.Collections.Review;

@Repository
public interface ReviewRepository extends MongoRepository<Review, ObjectId> {
    
}
