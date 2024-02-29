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
    searchTerm: string
    setKategorienGallery: (value: boolean) => void
}

export default function KategorieGallery({kategorieList, searchTerm, setKategorienGallery}: KategorieGalleryProps) {


    const {kategorieName} = useParams<{ kategorieName: string }>();

    const [rezeptlist, setRezeptList] = useState<Rezept[]>([]);

    const kategorie: Kategorie = kategorieList.filter(kategorie => kategorie.kategorieName === kategorieName)[0];

    function fetchRezepteFuerKategorie() {
        axios.get("/api/rezepte/kategorie/" + kategorieName).then(response => {
            setRezeptList(response.data);
        });
    }

    useEffect(() => {
        fetchRezepteFuerKategorie();
        setKategorienGallery(true);
        return () => {
            setKategorienGallery(false);
        }
    }, []);


    return (<>
        <h1 className="text-3xl font-bold text-center m-4">{kategorie.kategorieName}</h1>
        <div className="flex justify-center">
            <h4 className="text-center text-lg p-8 w-1/3 shadow-kategorieIn mt-14 rounded-2xl text-wrap">{kategorie.kategorieBeschreibung}</h4>
        </div>
        <AnimatePresence>

            <motion.div className="RezeptGallery flex flex-wrap flex-row justify-center w-full m-10 p-1"
                        variants={variants.container}>
                {rezeptlist && rezeptlist.filter(rezept =>
                    rezept.rezeptName
                        .toLowerCase()
                        .includes(searchTerm) || searchTerm === "" ||
                    rezept.rezeptBeschreibung.toLowerCase()
                        .includes(searchTerm) ||
                    rezept.rezeptKurzbeschreibung.toLowerCase().includes(searchTerm)).map(rezept => {
                    return (
                        <motion.div className="Rezept Card basis-1/3 m-2 p-4
                                    rounded-2xl border-2 border-transparent color-textPrime"
                                    key={rezept.id}
                                    initial={variants.initial}
                                    animate={variants.animate}
                        >
                            <RezeptCard rezept={rezept}/>
                        </motion.div>)
                })}
            </motion.div>
        </AnimatePresence>
    </>)

}