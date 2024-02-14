package org.schmeckis.backend.model;

import lombok.With;
import org.schmeckis.backend.model.submodel.Kategorie;
import org.springframework.data.annotation.Id;

import java.util.List;

public record Rezept(

        @Id
        String id,

        String rezeptName,
        @With
        String rezeptImageUrl,

        String rezeptKurzbeschreibung,

        String rezeptBeschreibung,

        List<Kategorie> kategorieList
) {

}
