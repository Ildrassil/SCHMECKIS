import React, {FormEvent, useState} from "react";
import {Kategorie} from "../models/Kategorie.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Rezept} from "../models/Rezept.tsx";
import RezeptPhotoUpload from "./UploadPhoto.tsx";
import RichTextEditor from "./RichTextEditor.tsx";
import RezeptCard from "./RezeptCard.tsx";


export function AddRezept() {
    const navigate = useNavigate();

    const [newKategorie, setNewKategorie] = useState<Kategorie[]>([{
        kategorieName: "",
        kategorieBeschreibung: "",
    }]);

    const [actualRezept, setActualRezept] = useState({
        rezeptName: "",
        rezeptImageUrl: "",
        rezeptKurzbeschreibung: "",
        rezeptBeschreibung: "",
        kategorieList: []
    });

    const [rezept, setRezept] = useState<Rezept>()

    function onEditChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setActualRezept({...actualRezept, [event.target.name]: event.target.value})
    }

    function onChangeKategorie(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        const foundKategorie = newKategorie.find((kategorie, i) => i === index);
        const updatedKategorie = {...foundKategorie, [event.currentTarget.name]: event.currentTarget.value};
        const kategorie = newKategorie.map((kategorie, i) => i === index ? updatedKategorie : kategorie);
        setNewKategorie(kategorie);
    }

    function onChangeEditor(event: string) {
        setActualRezept({...actualRezept, rezeptBeschreibung: event})

    }

    function onChangeKurzbeschreibung(event: string) {
        setActualRezept({...actualRezept, rezeptKurzbeschreibung: event})

    }

    function addKategorie() {
        setNewKategorie([...newKategorie, {kategorieName: "", kategorieBeschreibung: ""}]);
    }

    function postRezept(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post('/api/rezept', actualRezept).then(response => {
            setRezept(response.data);


        })

    }

    const savePhoto = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post<string>('/api/upload/image/' + rezept?.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                setActualRezept({...actualRezept, rezeptImageUrl: `${response.data.value || ""}`})
            });
        } catch (error) {
            console.error('Error uploading image', error);
        }
    }

    function closeFunction() {
        if (rezept !== undefined) {
            navigate(`/rezept/${rezept.id}`);
        } else {
            navigate('/');
        }
    }


    return (
        <div
            className="flex align-middle justify-center m-10 p-5 rounded-2xl w-screen h-fit">
            <form onSubmit={postRezept} className="flex flex-col w-1/3 justify-center items-center h-full">
                <div className="flex flex-col w-full justify-center items-center bg-offWhite rounded-2xl">
                    <div className="flex flex-col w-full">
                        <h2 className="flex-coltext-textHeader text-3xl text-center my-2">ERSTELLE REZEPT</h2>
                        <label className="flex-col text-textPrime text-xl text-center mt-4">Rezept Name</label>
                        <input type="text" name="rezeptName" value={actualRezept.rezeptName}
                               onChange={onEditChange}
                               className="flex-col border-2 border-transparent rounded-2xl p-2 m-2"/>
                        <label className="flex-col text-textPrime text-xl text-center">IMAGE</label>
                        <RezeptPhotoUpload savePhoto={savePhoto}/>
                        <label className="flex-col text-textPrime text-xl text-center">Kurzbeschreibung</label>
                        <RichTextEditor rezeptBeschreibung={} onChange={}/>
                        <label className="flex-col text-textPrime text-xl text-center mt-4">Beschreibung</label>
                        <RichTextEditor onChange={onChangeEditor} rezeptBeschreibung={actualRezept.rezeptBeschreibung}/>
                        <label className="flex-col text-textPrime text-xl text-center">Kategorien</label>
                        {newKategorie.map((kategorie, index) => {
                            return (
                                <div className="flex-col" key={index}>{index + 1}.<input type="text"
                                                                                         name="kategorieName"
                                                                                         value={kategorie.kategorieName}
                                                                                         onChange={(e) => onChangeKategorie(e, index)}
                                                                                         className="flex-row border-2 border-transparent rounded-2xl p-2 m-2"/>
                                    <textarea name="kategorieBeschreibung" value={kategorie.kategorieBeschreibung}
                                              onChange={(e) => onChangeKategorie(e, index)}
                                              className="flex flex-row border-2 border-transparent rounded-2xl p-2 ml-6 mt-3 self-baseline"/>
                                </div>)
                        })}
                        <button type="button" onClick={addKategorie}
                                className="border-2 border-transparent
                                bg-offWhite text-textPrime
                                self-center
                                shadow-hashtagbuttonOut active:shadow-buttonIn
                                w-32 h-fit hover:shadow-buttonIn
                                rounded-2xl p-2 my-6">Add

                        </button>


                    </div>
                    <div className="flex flex-row space-x-1">
                        <button onClick={closeFunction}
                                className="flex-row justify-self-start
                                w-28 h-fit
                                bg-offWhite text-textPrime shadow-buttonOut hover:shadow-buttonIn
                                rounded-2xl p-2 m-2">Close
                        </button>
                        <button type="submit"
                                onSubmit={postRezept}
                                className="flex-row justify-end h-fit w-32 bg-offWhite
                                 font-semibold
                                 text-textHeader shadow-buttonOut hover:shadow-buttonIn
                                 rounded-2xl p-2 m-2">Save
                        </button>

                    </div>
                </div>
            </form>
            {rezept && <RezeptCard rezept={rezept}/>}
        </div>


    )

}