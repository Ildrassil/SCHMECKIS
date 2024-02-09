import {AnimatePresence, motion} from "framer-motion";
import {Kategorie} from "../models/Kategorie.tsx";
import * as React from 'react';
import {useEffect} from 'react';


type KategorieList = {
    overallKategories: Kategorie[],
    onCategoryClick: (kategorie: string) => void
}

const variants = {
    type: "tween",
    initial: {opacity: 0, y: -50, marginBottom: 0, padding: 0},
    animate: {opacity: 1, y: 0, marginBottom: 35, padding: 0.5},
    exit: {opacity: 0, y: -50, marginBottom: 0, padding: 0},
    container: {
        animate: {
            transition: {
                staggerChildren: 0.5,
                delayChildren: 0.2,
                ease: "easeIn"
            }
        },
        exit: {
            transition: {
                staggerChildren: 0.5,
                delayChildren: 0.2,
                ease: "easeInOut"
            }
        }
    }
};

export default function KategorieMenu({overallKategories, onCategoryClick}: KategorieList) {
    const [currentCategorie, setCurrentCategorie] = React.useState<string>("KATEGORIEN");
    const kategorieList: Kategorie[] = overallKategories;
    const Home = "Philipp and Jakobs list of Recipes from Websites, TikTok, Instagram and also own creations.";
    const [unfold, setUnfold] = React.useState<boolean>(false);
    function onCategorie(event: React.MouseEvent<HTMLButtonElement>) {
        setCurrentCategorie(event.currentTarget.value);
        setUnfold(false);
        kategorieList.map(kategorie => {
                if (kategorie.kategorieName === event.currentTarget.value) {
                    onCategoryClick(kategorie.kategorieName);
                }
            }
        )
        if (kategorieList.find(kategorie => kategorie.kategorieName === "KATEGORIEN") === undefined) {
            kategorieList.push({
                kategorieName: "KATEGORIEN",
                kategorieBeschreibung: Home
            });
        }
        const kategorie: Kategorie = kategorieList.find(kategorie => kategorie.kategorieName === event.currentTarget.value);
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
                <AnimatePresence>
                    {unfold && (
                        <motion.div variants={variants.container} initial="initial"
                                    animate={unfold ? "animate" : "initial"}
                                    exit="exit" className="MenuItems">
                    {kategorieList.map(kategorie => {
                        return <motion.button
                            initial={variants.initial}
                            animate={{...variants.animate, transition: {delay: 0.2}, padding: 10}}
                            exit={variants.exit}
                            className="MenuItem"
                            onClick={onCategorie}
                            value={kategorie.kategorieName}
                            key={kategorie.kategorieName}>
                            {kategorie.kategorieName}</motion.button>
                    })}
                </motion.div>
                    )}
                </AnimatePresence>
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