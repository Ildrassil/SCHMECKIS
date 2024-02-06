import {motion} from "framer-motion";
import {Kategorie} from "../models/Kategorie.tsx";
import * as React from 'react';
import {useEffect} from 'react';


type KategorieList = {
    overallKategories: Kategorie[],
    onCategoryClick: (kategorie: string) => void
}

export default function KategorieMenu({overallKategories, onCategoryClick}: KategorieList) {
    const [currentCategorie, setCurrentCategorie] = React.useState<string>("KATEGORIEN");
    const [kategorieList, setKategorieList] = React.useState<Kategorie[]>(overallKategories);
    const Home = "Philipp and Jakobs list of Recipes from Websites, TikTok, Instagram and also own creations.";
    const [unfold, setUnfold] = React.useState<boolean>(false);
    function onCategorie(event: React.MouseEvent<HTMLButtonElement>) {
        setCurrentCategorie(event.currentTarget.value);
        kategorieList.map(kategorie => {
                if (kategorie.kategorieName === event.currentTarget.value) {
                    onCategoryClick(kategorie.kategorieName);
                }
            }
        )
        if (kategorieList.map(kategorie => !kategorie.kategorieName.includes("KATEGORIEN"))) {
            kategorieList.push({
                kategorieName: "KATEGORIEN",
                kategorieBeschreibung: Home
            });
        }
        const kategorie: Kategorie = kategorieList?.find(kategorie => kategorie.kategorieName === event.currentTarget.value);
        setKategorieList(kategorieList.filter(kategorie => kategorie.kategorieName !== event.currentTarget.value));
        setKategorieList([...kategorieList, kategorie]);
    }

    useEffect(() => {

    }, []);

    function menuTrigger() {
        setUnfold(!unfold);
    }

    return (
        <div className="Menu">
            <div>
                <button onClick={menuTrigger}><h1>{currentCategorie}</h1>
                    <motion.svg animate={{rotate: unfold ? 90 : 0}} transition={{delay: 0.2, type: "tween"}}
                                xmlns="http://www.w3.org/2000/svg" width="30" height="50" viewBox="0 0 20 30">
                        <path id="Polygon_1" data-name="Polygon 1" d="M15,0,30,20H0Z"
                              transform="translate(20) rotate(90)" fill="#393939"/>
                    </motion.svg>
                </button>
                <motion.div animate={{y: unfold ? 50 : 0, scale: unfold ? 1 : 0, opacity: unfold ? 1 : 0}}
                            transition={{delay: 0.5, type: "tween"}}>
                    {kategorieList.map(kategorie => {
                        return <button className="MenuItem" onClick={onCategorie} value={kategorie.kategorieName}
                                       key={kategorie.kategorieName}>{kategorie.kategorieName}</button>
                    })}
                </motion.div>

            </div>

            <h4>
                {currentCategorie !== "KATEGORIEN" && kategorieList
                    .filter(kategorie => kategorie.kategorieName === currentCategorie)
                    .map(kategorie => {
                        return kategorie.kategorieBeschreibung
                    })}
                {currentCategorie === "KATEGORIEN" && Home}
            </h4>

        </div>
    );
}