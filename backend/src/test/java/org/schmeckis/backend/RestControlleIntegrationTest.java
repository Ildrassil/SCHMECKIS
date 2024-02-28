package org.schmeckis.backend;

import org.junit.jupiter.api.Test;
import org.schmeckis.backend.model.Rezept;
import org.schmeckis.backend.model.submodel.Kategorie;
import org.schmeckis.backend.repo.RezeptRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class RestControlleIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private RezeptRepo rezeptRepo;

    private final UUID idService = mock(UUID.class);


    @Test
    @DirtiesContext
    void testGetAllRezepte() throws Exception {
        //ARRANGE
        List<Rezept> allRezepts = List.of(new Rezept("1", "Kartoffelsalat", "Kartoffelsalat mit Mayo", "Kartoffelsalat", "Kartoffelsalat",
                List.of(new Kategorie("Salat", "Salat"))), new Rezept("2", "Nudelsalat", "Nudelsalat mit Mayo", "Nudelsalat", "Nudelsalat",
                List.of(new Kategorie("Salat", "Salat"))));
        rezeptRepo.save(allRezepts.get(0));
        rezeptRepo.save(allRezepts.get(1));
        String expected = """
                [
                    {
                        "id": "1",
                        "rezeptName": "Kartoffelsalat",
                        "rezeptImageUrl": "Kartoffelsalat mit Mayo",
                        "rezeptKurzbeschreibung": "Kartoffelsalat",
                        "rezeptBeschreibung": "Kartoffelsalat",
                        "kategorieList": [
                            {
                                "kategorieName": "Salat",
                                "kategorieBeschreibung": "Salat"
                            }
                        ]
                    },
                    {
                        "id": "2",
                        "rezeptName": "Nudelsalat",
                        "rezeptImageUrl": "Nudelsalat mit Mayo",
                        "rezeptKurzbeschreibung": "Nudelsalat",
                        "rezeptBeschreibung": "Nudelsalat",
                        "kategorieList": [
                            {
                                "kategorieName": "Salat",
                                "kategorieBeschreibung": "Salat"
                            }
                        ]
                    }
                ]
                """;
        //ACT
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/rezepte"))
                .andExpect(status().isOk())
                .andExpect(content().json(expected))
                .andReturn();


        //ASSERT
        assertEquals(200, result.getResponse().getStatus());

    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testCreateRezept() throws Exception {
        //ARRANGE
        String rezept = """
                {
                    "rezeptName": "Kartoffelsalat",
                    "rezeptImageUrl": "Kartoffelsalat mit Mayo",
                    "rezeptKurzbeschreibung": "Kartoffelsalat",
                    "rezeptBeschreibung": "Kartoffelsalat",
                    "kategorieList": [
                        {
                            "kategorieName": "Salat",
                            "kategorieBeschreibung": "Salat"
                        }
                    ]
                }
                """;

        //ACT
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/rezepte/create")
                        .contentType("application/json")
                        .content(rezept))
                .andExpect(status().isCreated())
                .andReturn();

        //ASSERT
        assertEquals(201, result.getResponse().getStatus());
    }

    @Test
    @DirtiesContext
    void testGetRezept() throws Exception {
        //ARRANGE
        Rezept rezept = new Rezept("1", "Kartoffelsalat", "Kartoffelsalat mit Mayo", "Kartoffelsalat", "Kartoffelsalat",
                List.of(new Kategorie("Salat", "Salat")));
        rezeptRepo.save(rezept);
        String expected = """
                {
                    "id": "1",
                    "rezeptName": "Kartoffelsalat",
                    "rezeptImageUrl": "Kartoffelsalat mit Mayo",
                    "rezeptKurzbeschreibung": "Kartoffelsalat",
                    "rezeptBeschreibung": "Kartoffelsalat",
                    "kategorieList": [
                        {
                            "kategorieName": "Salat",
                            "kategorieBeschreibung": "Salat"
                        }
                    ]
                }
                """;
        //ACT
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/rezepte/1"))
                .andExpect(status().isOk())
                .andExpect(content().json(expected))
                .andReturn();

        //ASSERT
        assertEquals(200, result.getResponse().getStatus());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testDeleteRezept() throws Exception {
        //ARRANGE
        Rezept rezept = new Rezept("1", "Kartoffelsalat", "Kartoffelsalat mit Mayo", "Kartoffelsalat", "Kartoffelsalat",
                List.of(new Kategorie("Salat", "Salat")));
        rezeptRepo.save(rezept);

        //ACT
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.delete("/api/rezepte/1"))
                .andExpect(status().isNoContent())
                .andReturn();

        //ASSERT
        assertEquals(204, result.getResponse().getStatus());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testUpdateRezept() throws Exception {
        //ARRANGE
        Rezept rezept = new Rezept("1", "Kartoffelsalat", "Kartoffelsalat mit Mayo", "Kartoffelsalat", "Kartoffelsalat",
                List.of(new Kategorie("Salat", "Salat")));
        rezeptRepo.save(rezept);
        String rezeptUpdate = """
                {
                    "rezeptName": "Nudelsalat",
                    "rezeptImageUrl": "Nudelsalat mit Mayo",
                    "rezeptKurzbeschreibung": "Nudelsalat",
                    "rezeptBeschreibung": "Nudelsalat",
                    "kategorieList": [
                        {
                            "kategorieName": "Salat",
                            "kategorieBeschreibung": "Salat"
                        }
                    ]
                }
                """;
        String expect = """
                {
                    "id": "1",
                    "rezeptName": "Nudelsalat",
                    "rezeptImageUrl": "Nudelsalat mit Mayo",
                    "rezeptKurzbeschreibung": "Nudelsalat",
                    "rezeptBeschreibung": "Nudelsalat",
                    "kategorieList": [
                        {
                            "kategorieName": "Salat",
                            "kategorieBeschreibung": "Salat"
                        }
                    ]
                }
                """;
        //ACT
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.put("/api/rezepte/1")
                        .contentType("application/json")
                        .content(rezeptUpdate))
                .andExpect(status().isOk())
                .andExpect(content().json(expect))
                .andReturn();

        //ASSERT
        assertEquals(200, result.getResponse().getStatus());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void addKategorieTest() throws Exception {
        Rezept rezept = new Rezept("1", "Nudelsalat", "Nudelsalat mit Mayo", "Nudelsalat", "Nudelsalat",
                List.of(new Kategorie("Salat", "Salat")));
        rezeptRepo.save(rezept);
        Kategorie kategorie = new Kategorie("Nudeln", "Nudeln");
        String kategorieUpDate = """
                {
                            "kategorieName": "Nudeln",
                            "kategorieBeschreibung": "Nudeln"
                }
                """;
        String expect = """
                {
                    "id": "1",
                    "rezeptName": "Nudelsalat",
                    "rezeptImageUrl": "Nudelsalat mit Mayo",
                    "rezeptKurzbeschreibung": "Nudelsalat",
                    "rezeptBeschreibung": "Nudelsalat",
                    "kategorieList": [
                        {
                            "kategorieName": "Salat",
                            "kategorieBeschreibung": "Salat"
                        },
                        {
                            "kategorieName": "Nudeln",
                            "kategorieBeschreibung": "Nudeln"
                            }
                    ]
                }
                """;
        //ACT
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.put("/api/rezepte/1/addKategorie")
                        .contentType("application/json")
                        .content(kategorieUpDate))
                .andExpect(status().isOk())
                .andExpect(content().json(expect))
                .andReturn();


        //ASSERT

        assertEquals(200, result.getResponse().getStatus());


    }

    @Test
    @DirtiesContext
    @WithMockUser
    void deleteKategorieTest() throws Exception {
        Rezept rezept = new Rezept("1", "Nudelsalat", "Nudelsalat mit Mayo", "Nudelsalat", "Nudelsalat",
                List.of(new Kategorie("Salat", "Salat"), new Kategorie("Nudeln", "Nudeln")));
        rezeptRepo.save(rezept);
        Kategorie kategorie = new Kategorie("Nudeln", "Nudeln");
        String kategorieUpDate = """
                {
                            "kategorieName": "Nudeln",
                            "kategorieBeschreibung": "Nudeln"
                }
                """;
        String expect = """
                {
                    "id": "1",
                    "rezeptName": "Nudelsalat",
                    "rezeptImageUrl": "Nudelsalat mit Mayo",
                    "rezeptKurzbeschreibung": "Nudelsalat",
                    "rezeptBeschreibung": "Nudelsalat",
                    "kategorieList": [
                        {
                            "kategorieName": "Salat",
                            "kategorieBeschreibung": "Salat"
                        }
                    ]
                }
                """;
        //ACT
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.delete("/api/rezepte/1/deleteKategorie")
                        .contentType("application/json")
                        .content(kategorieUpDate))
                .andExpect(status().isOk())
                .andExpect(content().json(expect))
                .andReturn();
        //ASSERT
        assertEquals(200, result.getResponse().getStatus());
    }

    @Test
    @DirtiesContext
    void getRezeptByKategorieTest() throws Exception {
        //ARRANGE
        List<Rezept> allRezepts = List.of(new Rezept("1", "Kartoffelsalat", "Kartoffelsalat mit Mayo", "Kartoffelsalat", "Kartoffelsalat",
                List.of(new Kategorie("Salat", "Salat"))), new Rezept("2", "Nudelsalat", "Nudelsalat mit Mayo", "Nudelsalat", "Nudelsalat",
                List.of(new Kategorie("Salat", "Salat"))), new Rezept("3", "Bohnen", "Bohnen", "Bohnen", "Bohnen",
                List.of(new Kategorie("Bohnen", "Bohnen"))));
        rezeptRepo.saveAll(allRezepts);
        String expect = """
                [
                {
                    "id": "3",
                    "rezeptName": "Bohnen",
                    "rezeptImageUrl": "Bohnen",
                    "rezeptKurzbeschreibung": "Bohnen",
                    "rezeptBeschreibung": "Bohnen",
                    "kategorieList": [
                        {
                            "kategorieName": "Bohnen",
                            "kategorieBeschreibung": "Bohnen"
                        }
                    ]
                }
                ]
                """;
        //ACT
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/api/rezepte/kategorie/Bohnen"))
                .andExpect(status().isOk())
                .andExpect(content().json(expect))
                .andReturn();

        //ASSERT
        assertEquals(200, result.getResponse().getStatus());

    }



}
