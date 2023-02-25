package com.chetan.server.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.chetan.server.Collections.User;

@Repository
public interface UserInfoRepo extends MongoRepository<User, ObjectId> {
    Optional<User> findByEmail(String email);
}