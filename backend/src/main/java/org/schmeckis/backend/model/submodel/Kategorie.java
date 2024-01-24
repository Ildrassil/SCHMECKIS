package org.schmeckis.backend.model.submodel;

import java.util.UUID;

public record Kategorie(

        String Id,
        String kategorieName,

        String kategorieBeschreibung
) {
    public Kategorie(String kategorieName, String kategorieBeschreibung) {
        this(UUID.randomUUID().toString(), kategorieName, kategorieBeschreibung);
    }
}
