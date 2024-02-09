package org.schmeckis.backend.model;

import org.schmeckis.backend.model.submodel.Kategorie;
import org.springframework.data.annotation.Id;

import java.util.List;

public record Rezept(

        @Id
        String id,

        String rezeptName,

        String rezeptImageUrl,

        String rezeptKurzbeschreibung,

        String rezeptBeschreibung,

        List<Kategorie> kategorieList
) {

}
