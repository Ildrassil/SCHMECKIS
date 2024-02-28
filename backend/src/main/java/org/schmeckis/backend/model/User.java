package org.schmeckis.backend.model;

import org.springframework.data.annotation.Id;

import java.util.UUID;

public record User(
        @Id
        String id,
        String username,
        String password

) {
    public User(String username, String password) {
        this(UUID.randomUUID().toString(), username, password);
    }

}
