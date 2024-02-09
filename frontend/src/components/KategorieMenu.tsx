import {AnimatePresence, motion} from "framer-motion";
import {Kategorie} from "../models/Kategorie.tsx";
import * as React from 'react';
import {useEffect} from 'react';


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

type KategorieMenuProps = {
    onCategoryClick: (kategorie: string) => void
}

export default function KategorieMenu({onCategoryClick}: KategorieMenuProps) {
    const kategorieList: Kategorie[] = [
        {
            kategorieName: "LAND",
            kategorieBeschreibung: "Alles was das Herz eines Fleischfressers begehrt ob Wild oder weniger ausgefallene Fleischsorten"
        },
        {
            kategorieName: "SEE",
            kategorieBeschreibung: "Ariel udn Sebastian sind halt zu schmackhaft um sie bei Disney zu versuern zu lassen!"
        },
        {
            kategorieName: "VEGETARISCH",
            kategorieBeschreibung: "Vegetarier wissen um die Versuchung von Tierischenprodukten sind aber stark genug um der Fleischeslust zu wieder stehen"
        },
        {
            kategorieName: "VEGAN",
            kategorieBeschreibung: "Tiere sind Freunde und keine Nahrung! Auch nicht ihre Produkte!"
        },
        {
            kategorieName: "SÜSS",
            kategorieBeschreibung: "Süße Robenbabys im SoßerZoo( wer kein switch reloaded kenntist vlt zu Jung)"
        },
        {
            kategorieName: "KATEGORIEN",
            kategorieBeschreibung: "Philipp and Jakobs list of Recipes from Websites, TikTok, Instagram and also own creations."
        }
    ];
    const [kategorie, setKategorie] = React.useState<Kategorie[]>(kategorieList);
    const [currentCategorie, setCurrentCategorie] = React.useState<string>(kategorieList[5].kategorieName);
    const [unfold, setUnfold] = React.useState<boolean>(false);
    function onCategorie(event: React.MouseEvent<HTMLButtonElement>) {
        setKategorie(kategorieList.filter(kategorie => kategorie.kategorieName !== event.currentTarget.value));
        const onkategorie: Kategorie = kategorieList.find(kategorie => kategorie.kategorieName === event.currentTarget.value);
        setCurrentCategorie(onkategorie.kategorieName);
        onCategoryClick(event.currentTarget.value);
        setUnfold(false);


    }

    useEffect(() => {

    }, []);

    function menuTrigger() {
        setUnfold(!unfold);
    }

    return (
        <div className="Menu">
            <div>
                <button className="flex flex-row bg-transparent text-2xl text-current" onClick={menuTrigger}>
                    <h1>{currentCategorie}</h1>
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
                            <motion.button
                                initial={variants.initial}
                                animate={variants.animate}
                                exit={variants.exit}
                                className="MenuItem"
                                onClick={onCategorie}
                                value={kategorie[0].kategorieName}
                                key={kategorie[0].kategorieName}>
                                {kategorie[0].kategorieName}</motion.button>
                            <motion.button
                                initial={variants.initial}
                                animate={variants.animate}
                                exit={variants.exit}
                                className="MenuItem"
                                onClick={onCategorie}
                                value={kategorie[1].kategorieName}
                                key={kategorie[1].kategorieName}>
                                {kategorie[1].kategorieName}</motion.button>
                            <motion.button
                                initial={variants.initial}
                                animate={variants.animate}
                                exit={variants.exit}
                                className="MenuItem"
                                onClick={onCategorie}
                                value={kategorie[2].kategorieName}
                                key={kategorie[2].kategorieName}>
                                {kategorie[2].kategorieName}</motion.button>
                            <motion.button
                                initial={variants.initial}
                                animate={variants.animate}
                                exit={variants.exit}
                                className="MenuItem"
                                onClick={onCategorie}
                                value={kategorie[3].kategorieName}
                                key={kategorie[3].kategorieName}>
                                {kategorie[3].kategorieName}</motion.button>
                            <motion.button
                                initial={variants.initial}
                                animate={variants.animate}
                                exit={variants.exit}
                                className="MenuItem"
                                onClick={onCategorie}
                                value={kategorie[4].kategorieName}
                                key={kategorie[4].kategorieName}>
                                {kategorie[4].kategorieName}</motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            <h4>
                {kategorieList.find(kategorie => kategorie.kategorieName === currentCategorie)?.kategorieBeschreibung}
            </h4>

        </div>
    );
}