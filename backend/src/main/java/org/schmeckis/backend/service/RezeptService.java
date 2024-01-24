package org.schmeckis.backend.service;

import lombok.RequiredArgsConstructor;
import org.schmeckis.backend.model.Rezept;
import org.schmeckis.backend.model.dto.RequestRezept;
import org.schmeckis.backend.repo.RezeptRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RezeptService {

    RezeptRepo rezeptRepo;

    public void createRezept(RequestRezept rezept) {
        Optional<Rezept> isRezept = rezeptRepo.findByRezeptName(rezept.rezeptName());
        if (isRezept.isPresent()) {
            throw new IllegalArgumentException("Rezept already exists");
        }
        rezeptRepo.save(new Rezept(rezept.rezeptName(), rezept.rezeptImageUrl(), rezept.rezeptKurzbeschreibung(), rezept.rezeptBeschreibung(), rezept.kategorieList()));

    }


}
