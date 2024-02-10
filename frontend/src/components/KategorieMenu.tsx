import {AnimatePresence, motion} from "framer-motion";
import {Kategorie} from "../models/Kategorie.tsx";
import * as React from 'react';


const menuItems = {
    initial: {opacity: 0, y: -50, margin: 0},
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        paddibg: `${5 * index}px 0px`,
        transition: {delay: index * 0.2, when: "beforeChildren"}
    }),
    exit: (index: number) => ({
        opacity: 0,
        y: -50,
        padding: `${5 * index}px 0px`,
        transition: {delay: index * 0.2, when: "afterChildren"}
    }),
};
const conatainer = {
    initial: {opacity: 0, y: -50, marginBottom: 0, padding: 0.5},
    animate: {
        y: 0,
        opacity: 1,
        maxHeight: 500,
        transition: {

            type: "spring",
            staggerChildren: 0.2,
            duration: 0.5,
        }
    },
    exit: {
        y: -50,
        opacity: 0,
        maxHeight: 0,
        transition: {
            type: "tween",
            staggerChildren: 0.2,
            duration: 0.5,
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


    function menuTrigger() {
        setUnfold(!unfold);
    }

    return (
        <div className="Menu">
            <div>
                <button className="flex flex-row bg-transparent text-2xl text-current" onClick={menuTrigger}>
                    <h1>{currentCategorie}</h1>
                </button>
                <AnimatePresence>
                    {unfold && <motion.div
                        variants={conatainer}
                        initial={conatainer.initial}
                        animate={unfold ? conatainer.animate : conatainer.exit}
                        className="MenuItems">
                        {kategorie.map((kat, index) => (
                            <motion.button
                                initial={menuItems.initial}
                                animate={menuItems.animate(index)}
                                exit={menuItems.exit(index)}
                                className="MenuItem bg-transparent text-2xl p-4"
                                onClick={onCategorie}
                                value={kat.kategorieName}
                                key={kat.kategorieName}>
                                {kat.kategorieName}
                            </motion.button>
                        ))}
                    </motion.div>}
                </AnimatePresence>
            </div>


            <h4>
                {kategorieList.find(kategorie => kategorie.kategorieName === currentCategorie)?.kategorieBeschreibung}
            </h4>

        </div>
    );
}