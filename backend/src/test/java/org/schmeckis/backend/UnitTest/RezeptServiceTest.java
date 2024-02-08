package org.schmeckis.backend.UnitTest;

import org.junit.jupiter.api.Test;
import org.schmeckis.backend.model.Rezept;
import org.schmeckis.backend.model.dto.RequestRezept;
import org.schmeckis.backend.model.submodel.Kategorie;
import org.schmeckis.backend.repo.RezeptRepo;
import org.schmeckis.backend.service.RezeptService;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class RezeptServiceTest {

    private final RezeptRepo rezeptRepo = mock(RezeptRepo.class);

    private RezeptService rezeptService = new RezeptService(rezeptRepo);

    @Test
    void createRezept() {
        //ARRANGE
        Rezept expected = new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat")));
        RequestRezept requestRezept = new RequestRezept(
                "Kartoffelsalat", "www.kartoffelsalat.de",
                "Kartoffelsalat", "Kartoffelsalat",
                List.of(new Kategorie("Salat", "Salat")));
        doNothing().when(rezeptRepo.findByRezeptName("Kartoffelsalat"));
        when(rezeptRepo.save(new Rezept(requestRezept.rezeptName(), requestRezept.rezeptImageUrl(),
                requestRezept.rezeptKurzbeschreibung(), requestRezept.rezeptBeschreibung(),
                requestRezept.kategorieList()))).thenReturn(expected);
        //ACT
        Rezept actual = rezeptService.createRezept(requestRezept);
        //ASSERT
        assertEquals(expected, actual);
    }

    @Test
    void getRezept() {
        //ARRANGE
        Rezept expected = new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat")));
        when(rezeptRepo.findById("1")).thenReturn(Optional.of(expected));
        //ACT
        Rezept actual = rezeptService.getRezept("1");
        //ASSERT
        assertEquals(expected, actual);
    }

    @Test
    void deleteRezept() {
        //ARRANGE
        Rezept expected = new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat")));
        when(rezeptRepo.findById("1")).thenReturn(Optional.of(expected));
        doNothing().when(rezeptRepo).delete(expected);
        //ACT
        rezeptService.deleteRezept("1");
        //ASSERT
        verify(rezeptRepo, times(1)).delete(expected);
    }

    @Test
    void updateRezept() {
        //ARRANGE
        Rezept expected = new Rezept("1", "Walnuss",
                "www.kartoffelsalat.de", "Kartoffelsalat",
                "Kartoffelsalat", List.of(new Kategorie(
                "Salat", "Salat")));
        Rezept tobeUpdated = new Rezept("1", "Kartoffelsalat",
                "www.kartoffelsalat.de", "Kartoffelsalat",
                "Kartoffelsalat", List.of(new Kategorie(
                "Salat", "Salat")));
        RequestRezept requestRezept = new RequestRezept(
                "Kartoffelsalat", "www.kartoffelsalat.de",
                "Kartoffelsalat", "Kartoffelsalat",
                List.of(new Kategorie("Salat", "Salat")));
        when(rezeptRepo.findById("1")).thenReturn(Optional.of(tobeUpdated));
        when(rezeptRepo.save(new Rezept("1", requestRezept.rezeptName(),
                requestRezept.rezeptImageUrl(), requestRezept.rezeptKurzbeschreibung(),
                requestRezept.kategorieList()))).thenReturn(expected);
        //ACT
        rezeptService.updateRezept("1", requestRezept);
        //ASSERT
        verify(rezeptRepo, times(1)).save(expected);
    }

    @Test
    void addKategorieToRezept() {
        //ARRANGE
        Rezept expected = new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat"), new Kategorie("Gemüse", "Gemüse")));
        Rezept tobeUpdated = new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat")));
        Kategorie kategorie = new Kategorie("Gemüse", "Gemüse");
        List<Kategorie> kategorieList = List.of(new Kategorie("Salat", "Salat"));
        when(rezeptRepo.findById("1")).thenReturn(Optional.of(tobeUpdated));
        when(rezeptRepo.save(new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", kategorieList))).thenReturn(expected);
        //ACT
        rezeptService.addKategorieToRezept("1", kategorie);
        //ASSERT
        verify(rezeptRepo, times(1)).save(expected);
    }


}
