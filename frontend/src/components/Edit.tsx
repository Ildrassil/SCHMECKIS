import {Kategorie} from "../models/Kategorie.tsx";
import React, {useState} from "react";
import {Rezept} from "../models/Rezept.tsx";
import ReactModal from "react-modal";
import RichTextEditor from "./RichTextEditor.tsx";
import {JSONContent} from "@tiptap/react";
import RezeptPhotoUpload from "./UploadPhoto.tsx";
import {DeleteIcon} from "lucide-react";


type EditProps = {
    state: boolean,
    rezept: Rezept,
    saveEdit: (rezept: Rezept) => void,
    setOpenEdit: (state: boolean) => void,
    setPhoto: (file: File) => void,
    deleteRezept: () => void
};


export function Edit({state, rezept, saveEdit, setOpenEdit, setPhoto, deleteRezept}: EditProps) {
    const [showEdit, setShowEdit] = useState<boolean>(state);
    const [newKategorie, setNewKategorie] = useState<Kategorie[]>([...rezept.kategorieList]);
    const [actualRezept, setActualRezept] = useState<Rezept>(rezept)


    function onChangeKategorie(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        const foundKategorie: Kategorie | undefined = newKategorie.find((kategorie, i) => i === index);
        if (foundKategorie !== undefined) {
            const updatedKategorie: Kategorie = {
                ...foundKategorie,
                [event.currentTarget.name]: event.currentTarget.value
            };
            const kategorie: Kategorie[] = newKategorie.map((kategorie, i) => i === index ? updatedKategorie : kategorie);

            setNewKategorie(kategorie);
        }
    }

    function entKategorie(index: number) {
        const kategorie: Kategorie[] = newKategorie.filter((kategorie, i) => i !== index);
        setNewKategorie([...kategorie]);
    }

    function entferneRezept() {
        deleteRezept();
        closeFunction();
    }


    function addKategorie() {
        setNewKategorie([...newKategorie, {kategorieName: "", kategorieBeschreibung: ""}]);
    }

    function onEditChange(event: React.ChangeEvent<HTMLInputElement>) {
        setActualRezept({...actualRezept, [event.target.name]: event.target.value})
    }


    function submitEdit() {
        const rezeptToUpdate: Rezept = {...actualRezept, kategorieList: newKategorie};
        saveEdit(rezeptToUpdate);
        closeFunction();
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
                <form onSubmit={(event) => {
                    event.preventDefault()
                }} className="flex flex-col w-3/4 p-2 justify-center items-center h-full">
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
                            {newKategorie.map((kategorie, index) => {
                                return (
                                    <div key={index}
                                         className="flex flex-wrap flex-col justify-center justify-items-center">

                                        <label className="flex-row text-center mx-4 my-5">Kategorie Name</label>
                                        <input type="text"
                                               name="kategorieName"
                                               value={kategorie.kategorieName}
                                               onChange={(e) => onChangeKategorie(e, index)}
                                               className=" flex-row bg-offWhite shadow-buttonOut
                                               hover:shadow-buttonIn active:shadow-buttonIn
                                               border-2 w-fit justify-center self-center border-transparent
                                               rounded-2xl p-2 m-5"/>
                                        <label className="flex-row text-center mx-4 my-5">Kategorie Beschreibung</label>

                                        <textarea name="kategorieBeschreibung" value={kategorie.kategorieBeschreibung}
                                                  onChange={(e) => onChangeKategorie(e, index)}
                                                  className="flex flex-wrap flex-row justify-stretch bg-offWhite
                                                  hover:shadow-buttonIn active:shadow-buttonIn shadow-buttonOut
                                                  border-2 border-transparent active:shadow-hashtagbutton w-full
                                                  h-64 rounded-2xl p-5 ml-6 m-5 self-baseline"
                                        />
                                        <button type="button" onClick={() => {
                                            entKategorie(index)
                                        }}
                                                className="flex-row justify-self-start border-2 border-transparent
                                                 bg-offWhite text-textPrime self-center
                                                 active:shadow-buttonIn w-fit h-fit hover:shadow-buttonIn rounded-2xl py-1 px-6 my-8">
                                            <DeleteIcon className={"align-middle"} size="40" color="#646464"/>
                                        </button>
                                    </div>);
                            })}
                            <button type="button" onClick={addKategorie}
                                    className="border-2 border-transparent
                                bg-offWhite text-textPrime
                                self-center
                                shadow-hashtagbuttonOut active:shadow-buttonIn
                                w-32 h-fit hover:shadow-buttonIn
                                rounded-2xl p-2 my-8">ADD
                            </button>


                        </div>
                        <div className="flex flex-row space-x-1">
                            <button
                                type={"button"}
                                onClick={closeFunction}
                                    className="flex-row justify-self-start
                                w-28 h-fit
                                bg-offWhite text-textPrime shadow-buttonOut hover:shadow-buttonIn
                                rounded-2xl p-2 m-2">CLOSE
                            </button>
                            <button
                                type={"button"}
                                onClick={entferneRezept}
                                className="flex-row justify-self-start
                                w-28 h-fit
                                bg-offWhite text-textPrime shadow-buttonOut hover:shadow-buttonIn
                                rounded-2xl p-2 m-2">DELETE
                            </button>
                            <button type="button"
                                    onClick={submitEdit}
                                    className="flex-row justify-end h-fit w-32 bg-offWhite
                                 font-semibold
                                 text-textHeader shadow-buttonOut hover:shadow-buttonIn
                                 rounded-2xl p-2 mx-2 mt-2 mb-8">SAVE
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </ReactModal>
    );
}
