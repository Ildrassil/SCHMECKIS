import {Kategorie} from "../models/Kategorie.tsx";
import React, {useEffect, useState} from "react";
import {Rezept} from "../models/Rezept.tsx";
import ReactModal from "react-modal";
import RichTextEditor from "./RichTextEditor.tsx";
import {JSONContent} from "@tiptap/react";
import RezeptPhotoUpload from "./UploadPhoto.tsx";


type EditProps = {
    state: boolean,
    rezept: Rezept,
    saveEdit: () => void,
    setCurrentRezept: (rezept: Rezept) => void,
    setOpenEdit: (state: boolean) => void,
    setPhoto: (file: File) => void,
};
type OptionType = {
    value: Kategorie,
    label: string
};

export function Edit({state, rezept, saveEdit, setCurrentRezept, setOpenEdit, setPhoto}: EditProps) {
    const [showEdit, setShowEdit] = useState<boolean>(state);
    const [newKategorie, setNewKategorie] = useState<Kategorie[]>([{
        kategorieName: "",
        kategorieBeschreibung: "",
    }]);
    const [actualRezept, setActualRezept] = useState<Rezept>(rezept)


    function handleSelectChange(selectedOptions: OptionType[]) {
        setActualRezept({
            ...actualRezept,
            kategorieList: selectedOptions ? selectedOptions.map((option: OptionType) => option.value) : []
        });
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

    function onEditChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setActualRezept({...actualRezept, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        setCurrentRezept(actualRezept);
    }, []);

    function submitEdit() {
        saveEdit();

    }

    function onChangePhoto(file: File) {
        setPhoto(file);
    }

    function onChangeEditor(event: JSONContent) {
        const JsonString = JSON.stringify(event);
        setActualRezept({...actualRezept, rezeptBeschreibung: JsonString})

    }

    function onChangeKurzbeschreibung(event: JSONContent) {
        const JsonString = JSON.stringify(event);
        setActualRezept({...actualRezept, rezeptKurzbeschreibung: JsonString})

    }


    function closeFunction() {
        setShowEdit(false);
        setOpenEdit(false);
    }

    return (
        <ReactModal

            isOpen={showEdit}
            onRequestClose={closeFunction}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                },
                content: {
                    backgroundColor: '#ecf0f3',
                    borderRadius: '10px',
                    padding: '5rem',
                    width: '75%',
                    margin: 'auto',
                    border: 'none'
                }
            }}>
            <div
                className="flex align-middle justify-center m-10 p-5 rounded-2xl w-full h-fit ">
                <form onSubmit={submitEdit} className="flex flex-col w-3/4 p-2 justify-center items-center h-full">
                    <div className="flex flex-col w-full justify-center items-center bg-offWhite rounded-2xl">
                        <div className="flex flex-col w-full">
                            <h2 className="flex-coltext-textHeader text-3xl text-center my-5">ERSTELLE REZEPT</h2>
                            <label className="flex-col text-textPrime text-xl text-center mt-5">Rezept Name</label>
                            <input type="text" name="rezeptName" value={actualRezept.rezeptName}
                                   onChange={onEditChange}
                                   className="flex-col border-2 border-transparent rounded-2xl p-2 m-5"/>
                            <label className="flex-col text-textPrime text-xl text-center">IMAGE</label>
                            <RezeptPhotoUpload onChangePhoto={onChangePhoto}/>
                            <label className="flex-col text-textPrime text-xl m-5 text-center">Kurzbeschreibung</label>
                            <RichTextEditor rezeptBeschreibung={actualRezept.rezeptKurzbeschreibung}
                                            onChange={onChangeKurzbeschreibung}/>
                            <label className="flex-col text-textPrime text-xl text-center mt-5">Beschreibung</label>
                            <RichTextEditor onChange={onChangeEditor}
                                            rezeptBeschreibung={actualRezept.rezeptBeschreibung}/>
                            <label className="flex-col text-textPrime text-xl my-5 text-center">Kategorien</label>
                            {actualRezept.kategorieList.map((kategorie, index) => {
                                return (
                                    <div className="flex flex-col align-middle items-center content-center mt-5 "
                                         key={index}>
                                        {index + 1}.
                                        <input type="text"
                                               name="kategorieName"
                                               value={kategorie.kategorieName}
                                               onChange={(e) => onChangeKategorie(e, index)}
                                               className="flex-row bg-offWhite shadow-buttonOut hover:shadow-buttonIn active:shadow-buttonIn border-2 w-fit justify-center self-center border-transparent rounded-2xl p-2 m-2"/>
                                        <textarea name="kategorieBeschreibung"
                                                  value={kategorie.kategorieBeschreibung}
                                                  onChange={(e) => onChangeKategorie(e, index)}
                                                  className="flex flex-wrap flex-row justify-stretch bg-offWhite  hover:shadow-buttonIn active:shadow-buttonIn shadow-buttonOut border-2 border-transparent active:shadow-hashtagbutton w-full h-64 rounded-2xl p-5 ml-6 m-3 self-baseline"/>
                                    </div>)
                            })}
                            {newKategorie.map((kategorie, index) => {
                                return (
                                    <div key={index}
                                         className="flex flex-wrap flex-col justify-center justify-items-center">
                                        <label className="flex-row text-center mx-4 my-5">Kategorie Name</label>
                                        <input type="text"
                                               name="kategorieName"
                                               value={kategorie.kategorieName}
                                               onChange={(e) => onChangeKategorie(e, index)}
                                               className=" flex-row bg-offWhite shadow-buttonOut hover:shadow-buttonIn active:shadow-buttonIn border-2 w-fit justify-center self-center border-transparent rounded-2xl p-2 m-5"/>
                                        <label className="flex-row text-center mx-4 my-5">Kategorie Beschreibung</label>
                                        <textarea name="kategorieBeschreibung" value={kategorie.kategorieBeschreibung}
                                                  onChange={(e) => onChangeKategorie(e, index)}
                                                  className="flex flex-wrap flex-row justify-stretch bg-offWhite  hover:shadow-buttonIn active:shadow-buttonIn shadow-buttonOut border-2 border-transparent active:shadow-hashtagbutton w-full h-64 rounded-2xl p-5 ml-6 m-5 self-baseline"
                                        />
                                    </div>);
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
                                    onSubmit={submitEdit}
                                    className="flex-row justify-end h-fit w-32 bg-offWhite
                                 font-semibold
                                 text-textHeader shadow-buttonOut hover:shadow-buttonIn
                                 rounded-2xl p-2 mx-2 mt-2 mb-8">Save
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </ReactModal>
    );
}
