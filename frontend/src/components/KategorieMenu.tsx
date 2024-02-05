import {Kategorie} from "../models/Kategorie.tsx";
import * as React from 'react';
import {useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Button} from "@mui/material";
import {styled} from "@mui/material/styles";


type KategorieList = {
    overallKategories: Kategorie[],
    onCategoryClick: (kategorie: string) => void
}
const StyledButtonHeader = styled(Button)(() => ({
    backgroundColor: 'transparent',
    color: '#6CB6D9',
    fontSize: '5rem',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontWeight: 'semiBold',
}));

const SytledAccordion = styled(Accordion)(() => ({
    backgroundColor: 'transparent',
    flexDirection: 'column',
    color: '#6CB6D9',
    fontSize: '5rem',
    fontFamily: 'Montserrat',
    textAlign: 'center',
    borderRadius: 5,
    elevation: 0,
    px: 1,
    py: 0.25,
    IconComponentcon: {
        color: '#6CB6D9',
    }
}));
const StyledButton = styled(Button)(() => ({
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontSize: '4rem',
    fontFamily: 'Montserrat',
    fontWeight: 'regular',
    textAlign: 'center',
}));


export default function KategorieMenu({overallKategories, onCategoryClick}: KategorieList) {
    const [currentCategorie, setCurrentCategorie] = React.useState<string>("Kategorien");
    const [kategorieList, setKategorieList] = React.useState<Kategorie[]>(overallKategories);
    const Home = "Philipp and Jakobs list of Recipes from Websites, TikTok, Instagram and also own creations.";

    function onCategorie(event: React.MouseEvent<HTMLButtonElement>) {
        setCurrentCategorie(event.currentTarget.value);
        kategorieList.map(kategorie => {
                if (kategorie.kategorieName === event.currentTarget.value) {
                    onCategoryClick(kategorie.kategorieName);
                }
            }
        )
        if (kategorieList.map(kategorie => !kategorie.kategorieName.includes(Home))) {
            kategorieList.push({
                kategorieName: "Home",
                kategorieBeschreibung: "Philipp and Jakobs list of Recipes from Websites, TikTok, Instagram and also own cartoon."
            });
        }
        setKategorieList(kategorieList.filter(kategorie => kategorie.kategorieName !== event.currentTarget.value));
        setKategorieList([...kategorieList, event.target.value]);
    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <SytledAccordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <StyledButtonHeader value={currentCategorie} type={"button"}>{currentCategorie}</StyledButtonHeader>
                </AccordionSummary>
                <AccordionDetails>
                    {kategorieList && kategorieList.map(kategorie => {
                        return <StyledButton type="button" onClick={onCategorie} value={kategorie.kategorieName}>
                            {kategorie.kategorieName}</StyledButton>
                    })}
                </AccordionDetails>
            </SytledAccordion>
            <h4>
                {currentCategorie !== "Kategorien" && kategorieList
                    .filter(kategorie => kategorie.kategorieName === currentCategorie)
                    .map(kategorie => {
                        return kategorie.kategorieBeschreibung
                    })}
                {currentCategorie === "Kategorien" && Home}
            </h4>

        </div>
    );
}