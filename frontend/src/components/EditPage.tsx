import {Rezept} from "../models/Rezept.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Edit} from "./Edit.tsx";


const animateDetails = {
    initial: {opacity: 0, marginTop: 0, scale: 0.8},
    animate: {opacity: 1, marginTop: 25, scale: 1},
    transition: {duration: 2.5, type: "spring", damping: 11, stiffness: 35}
}

type RezeptProps = {
    setKategorie: (kategorie: string) => void
}

export default function DetailPage({setKategorie}: RezeptProps) {

    const {rezeptId} = useParams<{ rezeptId: string }>();
    const [openEdit, setOpenEdit] = useState(false);
    const [currentRezept, setCurrentRezept] = useState<Rezept>();

    const navigate = useNavigate();


    function fetchRezept() {
        axios.get("/api/rezepte/" + rezeptId).then(response => {
            setCurrentRezept(response.data);
        });
    }

    useEffect(() => {
        fetchRezept();
    }, []);


    function saveEdit() {
        axios.put("/api/rezepte/" + rezeptId, {
            currentRezept
        })
            .then(response => {
            console.log(response);
            if (response.status === 200) {
                setOpenEdit(false);
            }
        });
    }


    function onCategoryClick(event: React.MouseEvent<HTMLButtonElement>) {
        const kategorie = currentRezept?.kategorieList.map(kategorie => kategorie.kategorieName).includes(event.currentTarget.value);
        if (kategorie === undefined) {
            return;
        }
        setKategorie(event.currentTarget.value);
        navigate("/");
    }


    return (<div className="flex justify-center w-screen">
        <AnimatePresence>
            <motion.div
                layout={true}
                initial={animateDetails.initial} animate={animateDetails.animate} transition={animateDetails.transition}
                className={"flex flex-col self-center justify-center align-middle shadow-doubleOut mt-10-ml-56 content-center h-auto max-w-xl p-10 rounded-2xl object-center"}>

                {openEdit && <Edit setOpenEdit={setOpenEdit} state={openEdit} rezept={currentRezept}
                                   setCurrentRezept={setCurrentRezept} saveEdit={saveEdit}/>}
                <h2 className="flex-row font-bold self self-center text-textHeader text-3xl">{currentRezept?.rezeptName}</h2>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5 m-4 flex-row shadow-none hover:shadow-buttonIn rounded-2xl" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor" onClick={() => setOpenEdit(true)}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-4h8"/>
                    </svg>

                <img className="flex-col" src={currentRezept?.rezeptImageUrl} alt={currentRezept?.rezeptName}/>
                <p className="flex-col py-5 break-after-auto">{currentRezept?.rezeptBeschreibung}</p>
            <div>
                {currentRezept?.kategorieList.map(kategorie => (
                    <button
                        type={"button"}
                        onClick={onCategoryClick}
                        value={kategorie.kategorieName}
                        className="flex-row hover:shadow-hashtagbuttonOut active:shadow-hashtagbuttonOut shadow-hashtagbutton overflow-clip bg-offWhite w-fit rounded-full px-5 text-sm font-semibold text-textPrime mr-2 mb-2 p-1"
                        key={kategorie.kategorieName}>#{kategorie.kategorieName}</button>
                ))}
            </div>
            </motion.div>
        </AnimatePresence>
    </div>);

}