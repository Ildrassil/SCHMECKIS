package org.schmeckis.backend.model.submodel;

import java.util.UUID;

public record Kategorie(

        String Id,
        String kategorieName
) {
    public Kategorie(String kategorieName) {
        this(UUID.randomUUID().toString(), kategorieName);
    }
}
