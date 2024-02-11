import {Rezept} from "../models/Rezept.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Edit} from "./Edit.tsx";


const animateDetails = {
    initial: {opacity: 0, y: -50},
    animate: {opacity: 1, y: 0, transition: {duration: 0.25, type: "spring", stiffness: 260, damping: 20}}
}

export default function DetailPage() {

    const {rezeptId} = useParams<{ rezeptId: string }>();
    const [openEdit, setOpenEdit] = useState(false);
    const [currentRezept, setCurrentRezept] = useState<Rezept>();


    function fetchRezept() {
        axios.get("/api/rezepte/" + rezeptId).then(response => {
            setCurrentRezept(response.data);
        });
    }

    useEffect(() => {
        fetchRezept();
    }, []);


    function saveEdit() {
        axios.put("/api/rezepte/" + rezeptId, currentRezept).then(response => {
            console.log(response);
            if (response.status === 200) {
                setOpenEdit(false);
            }
        });
    }


    return (<div>
        <Link className="mt-4 align-middle self-center justify-center text-textHeader" to={"/"}><h1>SCHMECKIS</h1>
        </Link>
        <AnimatePresence>
            <motion.div initial={animateDetails.initial} animate={animateDetails.animate}
                        className="flex flex-col shadow-doubleOut mt-10 mx-10 content-center align-middle">
                {openEdit && <Edit setOpenEdit={setOpenEdit} state={openEdit} rezept={currentRezept}
                                   setCurrentRezept={setCurrentRezept} saveEdit={saveEdit}/>}
                <h2 className="flex-row flex-wrap font-bold content-center text-textHeader text-3xl">{currentRezept?.rezeptName}</h2>
                <button className="flex-row w-3 h-3 bg-offWhite rounded-full p-0.5" onClick={() => setOpenEdit(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 m-0.5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-4h8"/>
                    </svg>
                </button>
                <img src={currentRezept.rezeptImageUrl} alt={currentRezept.rezeptName}/>
                <p>{currentRezept.rezeptBeschreibung}</p>
            <div>
                {currentRezept.kategorieList.map(kategorie => (
                    <button
                        className="flex-row shadow-hashtagbutton overflow-clip bg-offWhite rounded-full px-3 text-sm font-semibold text-textPrime mr-2 mb-2 p-1"
                        key={kategorie.kategorieName}>{kategorie.kategorieName}</button>
                ))}
            </div>
            </motion.div>
        </AnimatePresence>
    </div>);

}