import {Kategorie} from "../models/Kategorie.tsx";
import React, {useEffect, useState} from "react";
import {Rezept} from "../models/Rezept.tsx";
import ReactModal from "react-modal";


type EditProps = {
    state: boolean,
    rezept: Rezept,
    saveEdit: () => void
    setCurrentRezept: (rezept: Rezept) => void,
    setOpenEdit: (state: boolean) => void,
};
type OptionType = {
    value: Kategorie,
    label: string
};

export function Edit({state, rezept, saveEdit, setCurrentRezept, setOpenEdit}: EditProps) {
    const [showEdit, setShowEdit] = useState<boolean>(state);
    const [newKategorie, setNewKategorie] = useState<Kategorie>({
        kategorieName: "",
        kategorieBeschreibung: "",
    });
    const [actualRezept, setActualRezept] = useState<Rezept>(rezept)

    const options = actualRezept.kategorieList.map(kategorie => ({value: kategorie, label: kategorie.kategorieName}))

    function handleSelectChange(selectedOptions: OptionType[]) {
        setActualRezept({
            ...actualRezept,
            kategorieList: selectedOptions ? selectedOptions.map((option: OptionType) => option.value) : []
        });
    }

    function addKategorie() {
        setActualRezept({...actualRezept, kategorieList: [...actualRezept.kategorieList, newKategorie]});
        setNewKategorie({kategorieName: '', kategorieBeschreibung: ''});
    }

    function onEditChange(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setActualRezept({...actualRezept, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        setCurrentRezept(actualRezept);
    }, [actualRezept]);

    function submitEdit() {
        saveEdit();

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
                    backgroundColor: '#e0e5ec',
                    boxShadow: 'inset -5px -5px 10px #ccd1d9, inset 5px 5px 10px #ffffff',
                    borderRadius: '10px',
                    padding: '5rem'
                }
            }}
        >
            <div className="flex align-middle justify-center m-10 p-5 bg-black bg-opacity-5 shadow-buttonOut z-50">
                <form onSubmit={saveEdit} className="flex flex-col justify-center items-center h-full">
                    <div className="flex flex-col justify-center items-center bg-offWhite p-4 rounded-2xl">
                        <div>
                            <h2 className="text-textHeader text-3xl shadow-doubleOut">EDIT</h2>
                            <input type="text" name="rezeptName" value={actualRezept.rezeptName}
                                   onChange={onEditChange}
                                   className="border-2 border-transparent rounded-2xl p-2 m-2"/>
                            <input type="text" name="rezeptImageUrl" value={actualRezept.rezeptImageUrl}
                                   onChange={onEditChange} className="border-2 border-transparent rounded-2xl p-2 m-2"/>
                            <textarea name="rezeptBeschreibung" value={actualRezept.rezeptBeschreibung}
                                      onChange={onEditChange}
                                      className="border-2 border-transparent rounded-2xl p-2 m-2"/>
                            <input type="text" name="kategorieName" value={newKategorie.kategorieName}
                                   onChange={(e) => setNewKategorie({...newKategorie, kategorieName: e.target.value})}
                                   className="border-2 border-transparent rounded-2xl p-2 m-2"/>
                            <textarea name="kategorieBeschreibung" value={newKategorie.kategorieBeschreibung}
                                      onChange={(e) => setNewKategorie({
                                          ...newKategorie,
                                          kategorieBeschreibung: e.target.value
                                      })} className="border-2 border-transparent rounded-2xl p-2 m-2"/>
                            <button onClick={addKategorie}
                                    className="border-2 border-transparent rounded-2xl p-2 m-2">Add Kategorie
                            </button>
                            <Select
                                isMulti
                                name="kategorieList"
                                options={options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleSelectChange}
                            />
                        </div>
                        <div className="flex flex-row space-x-1">
                            <button onClick={closeFunction()}
                                    className="flex-row justify-self-start bg-offWhite text-textPrime shadow-buttonOut hover:shadow-buttonIn rounded-2xl p-2 m-2">Close
                            </button>
                            <button type="submit"
                                    onClick={submitEdit}
                                    className="flex-row justify-end bg-offWhite text-green-200 shadow-buttonOut hover:shadow-buttonIn rounded-2xl p-2 m-2">Save
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </ReactModal>
    );
}