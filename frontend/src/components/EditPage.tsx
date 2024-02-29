import {Rezept} from "../models/Rezept.tsx";
import {AnimatePresence, motion} from "framer-motion";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Edit} from "./Edit.tsx";
import {generateHTML} from "@tiptap/react";
import {Color} from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import StarterKit from "@tiptap/starter-kit";
import TipTapRender from "../utilTiptap/TipTapRender.tsx";


const animateDetails = {
    initial: {opacity: 0, marginTop: 0, scale: 0.8},
    animate: {opacity: 1, marginTop: 25, scale: 1},
    transition: {duration: 2.5, type: "spring", damping: 11, stiffness: 35}
}

type RezeptProps = {
    setKategorie: (kategorie: string) => void
    loggedIn: boolean
}

export default function DetailPage({setKategorie, loggedIn}: RezeptProps) {

    const {rezeptId} = useParams<{ rezeptId: string }>();
    const [openEdit, setOpenEdit] = useState(false);
    const [currentRezept, setCurrentRezept] = useState<Rezept>();
    const [photo, setPhoto] = useState<File | undefined>(undefined);

    const navigate = useNavigate();

    const outputHTML = (() => {
        if (currentRezept) {



            return generateHTML(JSON.parse(currentRezept.rezeptBeschreibung), [

                    Color.configure({types: [TextStyle.name, ListItem.name]}),
                // @ts-expect-error - starter kit is Libary Example
                    TextStyle.configure({types: [ListItem.name]}),
                    StarterKit.configure({
                        bulletList: {
                            HTMLAttributes: {
                                class: "list-disc"
                            },
                            keepMarks: true,
                            keepAttributes: true,
                        },
                        orderedList: {
                            HTMLAttributes: {
                                class: "list-decimal"
                            },
                            keepMarks: true,
                            keepAttributes: true,
                        },
                    }),
                ],
            );
        }
        return "";
    })();


    const saveEdit = async (rezept: Rezept) => {

        const response = await axios.put('/api/rezepte/' + rezeptId, rezept);
        if (response.status === 200) {
            let rezeptUrl: string | undefined;
            if (photo !== undefined) {
                rezeptUrl = await savePhoto(photo, response.data.id);

            }
            setCurrentRezept({...response.data, rezeptImageUrl: rezeptUrl});
            setOpenEdit(false);
        } else {
            setOpenEdit(true);
        }

    }


    const savePhoto = async (file: File, id: string) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post<string>('/api/upload/image/' + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPhoto(undefined);
            return response.data;
        } catch (error) {
            console.error('Error uploading image', error);
        }


    }


    function fetchRezept() {
        axios.get("/api/rezepte/" + rezeptId).then(response => {
            setCurrentRezept(response.data);
        });
    }

    useEffect(() => {
        fetchRezept();
    }, []);





    function onCategoryClick(event: React.MouseEvent<HTMLButtonElement>) {
        const kategorie = currentRezept?.kategorieList.map(kategorie => kategorie.kategorieName).includes(event.currentTarget.value);
        if (kategorie === undefined) {
            return;
        }
        setKategorie(event.currentTarget.value);
        navigate("/");
    }

    if (currentRezept === undefined) {
        return <div className="flex justify-center w-screen">
            <AnimatePresence>
                <motion.div
                    layout={true}
                    initial={animateDetails.initial} animate={animateDetails.animate}
                    transition={animateDetails.transition}
                    className={"flex flex-col self-center justify-center align-middle shadow-doubleOut mt-10 content-center h-auto w-8/12 p-10 rounded-2xl object-center"}>
                    <h2 className="flex-row font-bold self self-center text-textHeader text-3xl">Loading...</h2>
                </motion.div>
            </AnimatePresence>
        </div>;
    }
    return (<div className="flex justify-center w-screen">
        <AnimatePresence>
            <motion.div
                layout={true}
                initial={animateDetails.initial} animate={animateDetails.animate} transition={animateDetails.transition}
                className={"flex flex-col self-center justify-center align-middle shadow-doubleOut mt-10 content-center h-auto w-8/12 p-10 rounded-2xl object-center"}>

                {openEdit && <Edit setOpenEdit={setOpenEdit} state={openEdit} setPhoto={setPhoto} rezept={currentRezept}
                                   saveEdit={saveEdit}/>}
                <h2 className="flex-row font-bold self self-center text-textHeader text-3xl">{currentRezept?.rezeptName}</h2>
                {loggedIn && <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5 m-4 flex-row shadow-none hover:shadow-buttonIn rounded-2xl" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor" onClick={() => setOpenEdit(true)}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-4-4h8"/>
                </svg>}

                <img
                    className="flex flex-wrap flex-col justify-center content-center justify-items-center items-center mt-10 w-7/12"
                    src={currentRezept?.rezeptImageUrl} alt={currentRezept?.rezeptName}/>
                <TipTapRender content={outputHTML}/>
            <div>
                {currentRezept?.kategorieList.map(kategorie => (
                    <button
                        type={"button"}
                        onClick={onCategoryClick}
                        value={kategorie.kategorieName}
                        className="flex-row hover:shadow-hashtagbuttonOut active:shadow-hashtagbuttonOut
                                   shadow-hashtagbutton overflow-clip bg-offWhite w-fit rounded-full
                                   px-5 text-sm font-semibold text-textPrime mr-2 mb-2 p-1"
                        key={kategorie.kategorieName}>#{kategorie.kategorieName}</button>
                ))}
            </div>
            </motion.div>
        </AnimatePresence>
    </div>);

}