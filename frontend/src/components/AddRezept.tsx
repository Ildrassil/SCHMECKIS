import React, {useState} from "react";
import {Kategorie} from "../models/Kategorie.tsx";
import axios from "axios";


export function AddRezept() {
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

    function onEditChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setActualRezept({...actualRezept, [event.target.name]: event.target.value})
    }

    function onChangeKategorie(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        const foundKategorie = newKategorie.find((kategorie, i) => i === index);
        const updatedKategorie = {...foundKategorie, [event.currentTarget.name]: event.currentTarget.value};
        const kategorie = newKategorie.map((kategorie, i) => i === index ? updatedKategorie : kategorie);
        setNewKategorie(kategorie);
    }


    function addKategorie() {
        setNewKategorie([...newKategorie, {kategorieName: "", kategorieBeschreibung: ""}]);
    }

    function postRezept() {
        axios.post('/api/rezept', actualRezept).then(response => {
            console.log(response);

        })
    }

    function closeFunction() {
        console.log("close");
    }

    console.log(newKategorie)
    return (
        <div
            className="flex align-middle justify-center m-10 p-5 bg-offWhite shadow-doubleOut rounded-2xl w-screen h-fit">
            <form onSubmit={postRezept} className="flex flex-col justify-center items-center h-full">
                <div className="flex flex-col justify-center items-center bg-offWhite rounded-2xl">
                    <div className="flex flex-col">
                        <h2 className="flex-coltext-textHeader text-3xl text-center my-2">ERSTELLE REZEPT</h2>
                        <label className="flex-col text-textPrime text-xl text-center mt-4">Rezept Name</label>
                        <input type="text" name="rezeptName" value={actualRezept.rezeptName}
                               onChange={onEditChange}
                               className="flex-col border-2 border-transparent rounded-2xl p-2 m-2"/>
                        <label className="flex-col text-textPrime text-xl text-center">IMAGE</label>
                        <input type="text" name="rezeptImageUrl" value={actualRezept.rezeptImageUrl}
                               onChange={onEditChange}
                               className="flex-col border-2 border-transparent rounded-2xl p-2 m-2"/>
                        <label className="flex-col text-textPrime text-xl text-center mt-4">Beschreibung</label>
                        <textarea name="rezeptBeschreibung" value={actualRezept.rezeptBeschreibung}
                                  onChange={onEditChange}
                                  className="flex-col border-2 border-transparent rounded-2xl p-2 m-2"/>
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
                                              className="flex flex-row border-2 border-transparent rounded-2xl p-2 m-2 self-baseline"/>
                                </div>)
                        })}
                        <button type="button" onClick={addKategorie}
                                className="border-2 border-transparent rounded-2xl p-2 m-2">Add Kategorie
                        </button>


                    </div>
                    <div className="flex flex-row space-x-1">
                        <button onClick={closeFunction}
                                className="flex-row justify-self-start bg-offWhite text-textPrime shadow-buttonOut hover:shadow-buttonIn rounded-2xl p-2 m-2">Close
                        </button>
                        <button type="submit"
                                onSubmit={postRezept}
                                className="flex-row justify-end bg-offWhite text-green-200 shadow-buttonOut hover:shadow-buttonIn rounded-2xl p-2 m-2">Save
                        </button>

                    </div>
                </div>
            </form>
        </div>

    )

}