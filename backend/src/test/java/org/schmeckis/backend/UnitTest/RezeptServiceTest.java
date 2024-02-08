package org.schmeckis.backend.UnitTest;

import org.junit.jupiter.api.Test;
import org.schmeckis.backend.model.Rezept;
import org.schmeckis.backend.model.dto.RequestRezept;
import org.schmeckis.backend.model.submodel.Kategorie;
import org.schmeckis.backend.repo.RezeptRepo;
import org.schmeckis.backend.service.RezeptService;
import org.schmeckis.backend.util.IdService;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class RezeptServiceTest {

    private final RezeptRepo rezeptRepo = mock(RezeptRepo.class);
    private final IdService idService = mock(IdService.class);

    private RezeptService rezeptService = new RezeptService(rezeptRepo, idService);


    @Test
    void createRezeptTest() {
        //ARRANGE
        Rezept expected = new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat")));
        RequestRezept requestRezept = new RequestRezept(
                "Kartoffelsalat", "www.kartoffelsalat.de",
                "Kartoffelsalat", "Kartoffelsalat",
                List.of(new Kategorie("Salat", "Salat")));
        when(rezeptRepo.findByRezeptName("Kartoffelsalat")).thenReturn(Optional.empty());
        when(idService.generateId()).thenReturn("1");
        when(rezeptRepo.save(new Rezept("1", requestRezept.rezeptName(), requestRezept.rezeptImageUrl(),
                requestRezept.rezeptKurzbeschreibung(), requestRezept.rezeptBeschreibung(),
                requestRezept.kategorieList()))).thenReturn(expected);
        //ACT
        Rezept actual = rezeptService.createRezept(requestRezept);
        //ASSERT
        verify(rezeptRepo, times(1)).save(new Rezept("1", requestRezept.rezeptName(), requestRezept.rezeptImageUrl(),
                requestRezept.rezeptKurzbeschreibung(), requestRezept.rezeptBeschreibung(),
                requestRezept.kategorieList()));
        assertEquals(expected, actual);


    }

    @Test
    void getRezeptTest() {
        //ARRANGE
        Rezept expected = new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat")));
        when(rezeptRepo.findById("1")).thenReturn(Optional.of(expected));
        //ACT
        Rezept actual = rezeptService.getRezept("1");
        //ASSERT
        assertEquals(expected, actual);
    }

    @Test
    void deleteRezeptTest() {
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
    void updateRezeptTest() {
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
                "Walnuss", "www.kartoffelsalat.de",
                "Kartoffelsalat", "Kartoffelsalat",
                List.of(new Kategorie("Salat", "Salat")));
        when(rezeptRepo.findById("1")).thenReturn(Optional.of(tobeUpdated));
        when(idService.generateId()).thenReturn("1");
        when(rezeptRepo.save(new Rezept(idService.generateId(), requestRezept.rezeptName(),
                requestRezept.rezeptImageUrl(), requestRezept.rezeptKurzbeschreibung(), requestRezept.rezeptBeschreibung(),
                requestRezept.kategorieList()))).thenReturn(expected);
        //ACT
        Rezept actual = rezeptService.updateRezept("1", requestRezept);
        //ASSERT
        verify(rezeptRepo, times(1)).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void addKategorieToRezeptTest() {
        //ARRANGE
        Rezept expected = new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat"), new Kategorie("Gemüse", "Gemüse")));
        Rezept tobeUpdated = new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat")));
        Kategorie kategorie = new Kategorie("Gemüse", "Gemüse");
        List<Kategorie> kategorieList = List.of(new Kategorie("Salat", "Salat"), kategorie);
        when(rezeptRepo.findById("1")).thenReturn(Optional.of(tobeUpdated));
        when(rezeptRepo.save(new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", kategorieList))).thenReturn(expected);
        //ACT
        Rezept actual = rezeptService.addKategorieToRezept("1", kategorie);
        //ASSERT
        verify(rezeptRepo, times(1)).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void deleteKategorieFromRezeptTest() {
        //ARRANGE
        Rezept expected = new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of());
        Rezept tobeUpdated = new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat")));
        Kategorie kategorie = new Kategorie("Salat", "Salat");
        List<Kategorie> kategorieList = List.of();
        when(rezeptRepo.findById("1")).thenReturn(Optional.of(tobeUpdated));
        when(idService.generateId()).thenReturn("1");
        when(rezeptRepo.save(new Rezept(idService.generateId(), "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", kategorieList))).thenReturn(expected);
        //ACT
        Rezept actual = rezeptService.deleteKategorieFromRezept("1", kategorie);
        //ASSERT

        verify(rezeptRepo, times(1)).save(expected);
        assertEquals(expected, actual);


    }

    @Test
    void getAllRezepteTest() {
        //ARRANGE
        List<Rezept> expected = List.of(new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat"))));
        when(rezeptRepo.findAll()).thenReturn(expected);
        //ACT
        List<Rezept> actual = rezeptService.getAllRezepte();
        //ASSERT
        assertEquals(expected, actual);
    }

    @Test
    void getRezepteByKategorieTest() {
        //ARRANGE
        List<Rezept> expected = List.of(new Rezept("1", "Kartoffelsalat", "www.kartoffelsalat.de", "Kartoffelsalat", "Kartoffelsalat", List.of(new Kategorie("Salat", "Salat"), new Kategorie("Gemüse", "Gemüse"))));
        when(rezeptRepo.findAll()).thenReturn(expected);
        //ACT
        List<Rezept> actual = rezeptService.getRezepteByKategorie("Salat");
        //ASSERT
        assertEquals(expected, actual);
    }


}
