package org.schmeckis.backend.util;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class IdService {

    public String generateId() {
        return UUID.randomUUID().toString();
    }
}
