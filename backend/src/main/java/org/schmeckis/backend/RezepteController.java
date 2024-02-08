package org.schmeckis.backend;

import lombok.RequiredArgsConstructor;
import org.schmeckis.backend.model.Rezept;
import org.schmeckis.backend.model.dto.RequestRezept;
import org.schmeckis.backend.model.submodel.Kategorie;
import org.schmeckis.backend.service.RezeptService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rezepte")
@RequiredArgsConstructor
public class RezepteController {

    private final RezeptService rezeptService;

    @GetMapping
    public List<Rezept> getAllRezepte() {
        return rezeptService.getAllRezepte();
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Rezept createRezept(@RequestBody RequestRezept rezept) {
        return rezeptService.createRezept(rezept);
    }

    @GetMapping("/{id}")
    public Rezept getRezept(@PathVariable String id) {
        return rezeptService.getRezept(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRezept(@PathVariable String id) {
        rezeptService.deleteRezept(id);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateRezept(@PathVariable String id, @RequestBody RequestRezept rezept) {
        rezeptService.updateRezept(id, rezept);
    }

    @PutMapping("/{id}/addKategorie")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void addKategorieToRezept(@PathVariable String id, @RequestBody Kategorie kategorie) {
        rezeptService.addKategorieToRezept(id, kategorie);
    }

    @DeleteMapping("/{id}/deleteKategorie")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteKategorieFromRezept(@PathVariable String id, @RequestBody Kategorie kategorie) {
        rezeptService.deleteKategorieFromRezept(id, kategorie);
    }

    @GetMapping("/kategorie/{kategorieName}")
    public List<Rezept> getRezepteByKategorie(@PathVariable String kategorieName) {
        return rezeptService.getRezepteByKategorie(kategorieName);
    }


}