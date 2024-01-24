package org.schmeckis.backend.model.dto;

import org.schmeckis.backend.model.submodel.Kategorie;

import java.util.List;

/**
 * DTO for {@link org.schmeckis.backend.model.Rezept}
 */
public record RequestRezept(
        String rezeptName,
        String rezeptImageUrl,
        String rezeptKurzbeschreibung,
        String rezeptBeschreibung,
        List<Kategorie> kategorieList) {


}