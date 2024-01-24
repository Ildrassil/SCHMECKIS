package org.schmeckis.backend.model;

import org.schmeckis.backend.model.submodel.Kategorie;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.UUID;

public record Rezept(

        @Id
        String id,

        String rezeptName,

        String rezeptImageUrl,

        String rezeptKurzbeschreibung,

        String rezeptBeschreibung,

        List<Kategorie> kategorieList
) {
    public Rezept(String rezeptName, String rezeptImageUrl, String rezeptKurzbeschreibung, String rezeptBeschreibung, List<Kategorie> kategorieList) {
       this(UUID.randomUUID().toString(), rezeptName, rezeptImageUrl, rezeptKurzbeschreibung, rezeptBeschreibung, kategorieList);
    }
}
