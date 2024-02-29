import {AnimatePresence, motion} from "framer-motion";
import {Kategorie} from "../models/Kategorie.tsx";
import * as React from 'react';


const menuItems = {
    initial: {opacity: 0, y: -50, margin: 0},
    animate: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {delay: index * 0.2, when: "beforeChildren"}
    }),
    exit: (index: number) => ({
        opacity: 0,
        y: -50,
        transition: {delay: index * 0.2, when: "afterChildren"}
    }),
};

const conatainer = {
    initial: {opacity: 0, marginBottom: 0, padding: 0.5},
    animate: {
        opacity: 1,
        transition: {

            type: "tween",
            staggerChildren: 0.2,
            duration: 0.5,
        }
    },
    exit: {
        opacity: 0,
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
        const onkategorie: Kategorie | undefined = kategorieList.find(kategorie => kategorie.kategorieName === event.currentTarget.value);
        if (onkategorie !== undefined) {
            setCurrentCategorie(onkategorie.kategorieName);
            onCategoryClick(onkategorie.kategorieName.toLowerCase());
            setUnfold(false);
        }
    }


    function menuTrigger() {
        setUnfold(!unfold);
    }

    return (
        <div className={`Menu flex flex-col pb-33 self-center items-center justify-center align-middle
        text-3xl text-textHeader transition-all duration-1000 ease-in-out 
        focus:text-blue-400  focus:border-transparent mt-36 `}>

            <button className="flex bg-transparent text-4xl text-current p-4" onClick={menuTrigger}>
                <h1>{currentCategorie}</h1>
            </button>

            {unfold && (
                <AnimatePresence>
                    <motion.div
                        layout
                        variants={conatainer}
                        initial={conatainer.initial}
                        animate={unfold ? conatainer.animate : conatainer.exit}
                        className="MenuItems flex flex-col items-center text-center justify-items-center">
                        {kategorie.map((kat, index) => (
                            <motion.button
                                initial={menuItems.initial}
                                animate={menuItems.animate(index)}
                                exit={menuItems.exit(index)}
                                className="MenuItem flex flex-col bg-transparent text-center text-textPrime text-2xl p-4"
                                onClick={onCategorie}
                                value={kat.kategorieName}
                                key={kat.kategorieName}>
                                {kat.kategorieName}
                            </motion.button>
                        ))}
                    </motion.div>
                </AnimatePresence>)}

            <h4 className="flex flex-wrap text-center text-xl p-5 w-1/3 shadow-kategorieIn mt-14 rounded-2xl">
                {kategorieList.find(kategorie => kategorie.kategorieName === currentCategorie)?.kategorieBeschreibung}
            </h4>

        </div>
    );
}