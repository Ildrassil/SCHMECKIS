import {Link, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Rezept} from "./models/Rezept.tsx";
import axios from "axios";
import {Kategorie} from "./models/Kategorie.tsx";
import KategorieMenu from "./components/KategorieMenu.tsx";
import RezeptGallery from "./components/RecepieGallery.tsx";
import './App.css';
import DetailPage from "./components/EditPage.tsx";
import {AddRezept} from "./components/AddRezept.tsx";

function App() {
    const [kategorieList, setKategorieList] = useState<Kategorie[]>([]);
    const [rezeptList, setRezeptList] = useState<Rezept[]>([]);

    function fetchRecipes() {
        axios.get("/api/rezepte").then(response => {
            setRezeptList(response.data);
            getKategories(response.data);
        });

    }

    function getKategories(rezeptListUpdate: Rezept[]) {
        const allKategories: Kategorie[] = [...kategorieList];
        for (let i = 0; i < rezeptListUpdate.length; i++) {
            for (let z = 0; z < rezeptListUpdate[i].kategorieList.length; z++) {
                if (!allKategories.includes(rezeptListUpdate[i].kategorieList[z])) {
                    allKategories.push(rezeptListUpdate[i].kategorieList[z]);
                }
            }
        }
        setKategorieList(allKategories);
    }

    function onCategoryClick(kategorie: string) {
        if (kategorie === "KATEGORIEN") {
            fetchRecipes();
        }
        setRezeptList(rezeptList.filter(rezept => rezept.kategorieList.map(kategorie => kategorie.kategorieName).includes(kategorie)));
    }

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <>
            <div className="Header">
                <Link to={"/"}><h1 className="HeadLine justify-center sticky align-middle text-4xl text-center font-semibold
                fontfamily-roboto font-sans
                text-textHeader
                pt-32 m-2">#SCHMECKIS</h1></Link>
                <Link to={"/addRezept"}>+</Link>
            </div>
            <KategorieMenu onCategoryClick={onCategoryClick}/>
            <Routes>
                <Route path={"/"}
                       element={<RezeptGallery rezeptList={rezeptList}/>}/>
                <Route path={`/rezept/:rezeptId`} element={<DetailPage/>}/>
                <Route path={"/addRezept"} element={<AddRezept/>}/>
            </Routes>

        </>
    )
}

export default App
