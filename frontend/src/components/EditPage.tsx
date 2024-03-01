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
import {Pen} from "lucide-react";


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

    const deleteRezept = () => {
        axios.delete('/api/rezepte/' + rezeptId).then(response => {
            if (response.status === 204) {
                navigate("/");
            }
        });
    }

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
                    initial={animateDetails.initial} animate={animateDetails.animate}
                    transition={animateDetails.transition}
                    className={"flex flex-col self-center items-center justify-center align-middle shadow-doubleOut mt-10 content-center h-auto w-8/12 p-10 rounded-2xl object-center"}>

                    {openEdit &&
                        <Edit deleteRezept={deleteRezept} setOpenEdit={setOpenEdit} state={openEdit} setPhoto={setPhoto}
                              rezept={currentRezept}
                              saveEdit={saveEdit}/>}
                    <div className="flex justify-between items-center">
                        <h2 className="flex-row  text-4xl font-bold text-center justify-center text-textHeader my-10">{currentRezept?.rezeptName}</h2>
                        {loggedIn && <button className="bg-offWhite hover:shadow-buttonIn
                                   rounded-full p-2 w-auto"
                                             onClick={() => setOpenEdit(true)}>
                            <Pen size="30" color="#646464"/>
                        </button>}
                    </div>
                    <div className="flex justify-center content-center align-middle mx-10">
                        <img
                            className="border-transparent shadow-doubleIn object-cover mt-6 mb-2 rounded-2xl w-8/12 h-auto"
                            src={currentRezept?.rezeptImageUrl} alt={currentRezept?.rezeptName}/>
                    </div>
                    <TipTapRender content={outputHTML}/>
                    <div>
                        {currentRezept?.kategorieList.map(kategorie => (
                            <button
                                type={"button"}
                                onClick={onCategoryClick}
                                value={kategorie.kategorieName}
                                className="flex-row hover:shadow-hashtagbuttonOut text-xl font-sans active:shadow-hashtagbuttonOut
                                   shadow-hashtagbutton overflow-clip bg-offWhite w-fit rounded-full
                                   font-semibold text-textPrime mx-4 mb-2 px-6 py-2"
                                key={kategorie.kategorieName}>#{kategorie.kategorieName}</button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );

}