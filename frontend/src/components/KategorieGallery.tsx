import {AnimatePresence, motion} from "framer-motion";
import {Rezept} from "../models/Rezept.tsx";
import RezeptCard from "./RezeptCard.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Kategorie} from "../models/Kategorie.tsx";


const variants = {
    type: "slide",
    initial: {opacity: 0, y: -50},
    animate: {opacity: 1, y: 0},
    container: {
        animate: {
            type: "slide",
            transition: {
                staggerChildren: 0.5,
                delayChildren: 0.2,
                ease: "easeIn"
            }
        }
    }
};

type KategorieGalleryProps = {
    kategorieList: Kategorie[]
}

export default function KategorieGallery({kategorieList}: KategorieGalleryProps) {

    const {kategorieName} = useParams<{ kategorieName: string }>();
    const [rezeptlist, setRezeptList] = useState<Rezept[]>([]);
    const kategorie: Kategorie = kategorieList.filter(kategorie => kategorie.kategorieName === kategorieName)[0];

    function fetchRezepteFuerKategorie() {
        axios.get("/api/rezepte/kategorie/" + kategorieName).then(response => {
            console.log(response.data);
            setRezeptList(response.data);
        });
    }

    useEffect(() => {
        fetchRezepteFuerKategorie();
    }, []);


    return (
        <AnimatePresence>
            <h1 className="text-3xl font-bold text-center m-4">{kategorie.kategorieName}</h1>
            <p>kategorie.kategorieBeschreibung</p>
            <motion.div className="RezeptGallery flex flex-wrap flex-row justify-center m-2 p-1"
                        variants={variants.container}>

                {rezeptlist && rezeptlist.map(rezept => {
                    return (
                        <motion.div className="Rezept Card basis-1/3 m-2 p-4
                    rounded-2xl border-2 border-transparent color-textPrime" key={rezept.id}
                                    initial={variants.initial}
                                    animate={variants.animate}>
                            <RezeptCard rezept={rezept}/>
                        </motion.div>)

                })}
            </motion.div>
        </AnimatePresence>)

}