package org.schmeckis.backend.repo;

import org.schmeckis.backend.model.Rezept;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RezeptRepo extends MongoRepository<Rezept, String> {
}
