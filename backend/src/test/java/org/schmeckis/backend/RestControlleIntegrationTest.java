package org.schmeckis.backend;

import org.junit.jupiter.api.Test;
import org.schmeckis.backend.model.Rezept;
import org.schmeckis.backend.model.submodel.Kategorie;
import org.schmeckis.backend.repo.RezeptRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get("/rezepte"))
                .andExpect(status().isOk())
                .andExpect(content().json(expected))
                .andReturn();


        //ASSERT
        assertEquals(200, result.getResponse().getStatus());
    }

}
