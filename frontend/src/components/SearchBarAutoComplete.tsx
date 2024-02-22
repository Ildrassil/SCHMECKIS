import {useState} from "react";
import {Rezept} from "../models/Rezept.tsx";
import {Kategorie} from "../models/Kategorie.tsx";

type SearchBarProps = {
    rezeptList: Rezept[],
    kategorieList: Kategorie[],
    setFilteredRezepte: (rezepte: Rezept[]) => void,
}

export function SearchBar({rezeptList, kategorieList, setFilteredRezepte}: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [resultsRezepte, setResultsRezepte] = useState<Rezept[]>();
    const [resultsKategorie, setResultsKategorie] = useState<Kategorie[]>();
    const [rezept, setRezept] = useState<Rezept[]>(rezeptList);
    const [kategorie, setKategorie] = useState<Kategorie[]>(kategorieList);
    const [selected, setSelected] = useState<string[]>([]);


    function queryHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value);
        setResultsRezepte(rezept.filter(rezept => rezept.rezeptName.toLowerCase().includes(event.target.value.toLowerCase())));
        setResultsKategorie(kategorie.filter(kategorie => kategorie.kategorieName.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    function kategorieFilter(event: React.MouseEvent<HTMLButtonElement>) {
        setFilteredRezepte(rezept.filter(rezept => rezept.kategorieList.map(kategorie => kategorie.kategorieName).includes(event.currentTarget.value)));
    }

    function deSelectFilter(event: React.MouseEvent<HTMLButtonElement>) {
        setSelected(selected.filter(selected => selected !== event.currentTarget.value));
        setResultsRezepte(...resultsRezepte, resultsRezepte?.filter(rezept => rezept.rezeptName.toLowerCase() !== event.currentTarget.value.toLowerCase()));
        setResultsKategorie(...resultsKategorie, resultsKategorie?.filter(kategorie => kategorie.kategorieName.toLowerCase() !== event.currentTarget.value.toLowerCase()));
        setFilteredRezepte([...resultsRezepte, ...resultsKategorie]);
    }


    return (
        <div
            className="SearchBar flex bg-offWhite border-none flex-row justify-center ml-32 mt-5 active:w-fit active:border-none active:shadow-buttonIn font-semibold ">
            <input type="text"
                   className="flex-row border-none focus:border-none focus:shadow-buttonIn active:border-none font-semibold text-textHeader bg-offWhite"
                   placeholder="Search..." onChange={queryHandler}/>
            {selected && selected.map((selected) => (
                <button key={selected} value={selected} onClick={deSelectFilter}
                        className="flex-row bg-offWhite border-none active:shadow-buttonIn active:border-none px-1 mx-4">{selected}</button>
            ))}
            {query.length > 0 && query !== "" &&
                <div
                    className="flex flex-col bg-offWhite border-none active:shadow-buttonIn active:border-none overflow-y-scroll">
                    <div className="flex flex-col bg-offWhite border-none active:shadow-buttonIn active:border-none">
                        {resultsRezepte && resultsRezepte.map(rezept => (
                            <button key={rezept.id}
                                    className={"flex flex-col text-textPrime bg-offWhite border-none hover:shadow-buttonIn hover:text-textHeader"}
                                    onClick={() => setFilteredRezepte(resultsRezepte)}>{rezept.rezeptName}</button>
                        ))}
                    </div>
                    <div className="flex flex-col bg-offWhite border-none active:shadow-buttonIn active:border-none">
                        {resultsKategorie && resultsKategorie.map(kategorie => (
                            <button key={kategorie.kategorieName} value={kategorie.kategorieName}
                                    className={"flex flex-col text-textPrime bg-offWhite border-none hover:shadow-buttonIn hover:text-textHeader"}
                                    onClick={kategorieFilter}>{kategorie.kategorieName}</button>

                        ))}
                    </div>
                </div>}
        </div>
    );
}