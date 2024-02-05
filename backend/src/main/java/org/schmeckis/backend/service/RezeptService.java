package org.schmeckis.backend.service;

import lombok.RequiredArgsConstructor;
import org.schmeckis.backend.model.Rezept;
import org.schmeckis.backend.model.dto.RequestRezept;
import org.schmeckis.backend.model.submodel.Kategorie;
import org.schmeckis.backend.repo.RezeptRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RezeptService {

    private final RezeptRepo rezeptRepo;

    public Rezept createRezept(RequestRezept rezept) {
        Optional<Rezept> isRezept = rezeptRepo.findByRezeptName(rezept.rezeptName());
        if (isRezept.isPresent()) {
            throw new IllegalArgumentException("Rezept already exists");
        }
        rezeptRepo.save(new Rezept(rezept.rezeptName(), rezept.rezeptImageUrl(), rezept.rezeptKurzbeschreibung(), rezept.rezeptBeschreibung(), rezept.kategorieList()));
        return rezeptRepo.findByRezeptName(rezept.rezeptName()).get();
    }

    public Rezept getRezept(String id) throws IllegalArgumentException {
        return rezeptRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Rezept not found"));
    }

    public void deleteRezept(String id) {
        Rezept rezept = rezeptRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Rezept not found"));
        rezeptRepo.delete(rezept);
        rezeptRepo.findById(id).ifPresent(rezept1 -> {
            throw new IllegalArgumentException("Rezept not deleted");
        });
    }

    public void updateRezept(String id, RequestRezept rezept) {
        Rezept isRezept = rezeptRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Rezept not found"));
        Rezept rezeptToUpdate = new Rezept(id, rezept.rezeptName(), rezept.rezeptImageUrl(), rezept.rezeptKurzbeschreibung(), rezept.rezeptBeschreibung(), rezept.kategorieList());
        rezeptRepo.save(rezeptToUpdate);
    }

    public void addKategorieToRezept(String id, Kategorie kategorie) {
        Rezept rezept = rezeptRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Rezept not found"));
        List<Kategorie> kategorieList = new ArrayList<>(rezept.kategorieList());
        kategorieList.add(kategorie);
        Rezept rezeptToBeSafed = new Rezept(id, rezept.rezeptName(), rezept.rezeptImageUrl(), rezept.rezeptKurzbeschreibung(), rezept.rezeptBeschreibung(), kategorieList);
        rezeptRepo.save(rezeptToBeSafed);
    }

    public void deleteKategorieFromRezept(String id, Kategorie kategorie) {
        Rezept rezept = rezeptRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Rezept not found"));
        List<Kategorie> kategorieList = new ArrayList<>(rezept.kategorieList());
        kategorieList.remove(kategorie);
        Rezept rezeptToBeSafed = new Rezept(id, rezept.rezeptName(), rezept.rezeptImageUrl(), rezept.rezeptKurzbeschreibung(), rezept.rezeptBeschreibung(), kategorieList);
        rezeptRepo.save(rezeptToBeSafed);
    }

    public List<Rezept> getAllRezepte() {
        return rezeptRepo.findAll();
    }

    public List<Rezept> getRezepteByKategorie(String kategorieName) {
        List<Rezept> allRezepte = rezeptRepo.findAll();
        List<Rezept> rezepteByKategorie = new ArrayList<>();
        for (Rezept rezept : allRezepte) {
            if (rezept.kategorieList().contains(kategorieName)) {
                rezepteByKategorie.add(rezept);
            }
        }
        return rezepteByKategorie;
    }




}
