import {Link, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Rezept} from "./models/Rezept.tsx";
import axios from "axios";

import {Kategorie} from "./models/Kategorie.tsx";
import KategorieMenu from "./components/KategorieMenu.tsx";
import RezeptGallery from "./components/RecepieGallery.tsx";
import './App.css'


function App() {
    const [kategorieList, setKategorieList] = useState<Kategorie[]>([]);
    const [rezeptList, setRezeptList] = useState<Rezept[]>([]);

    function fetchRecipes() {
        axios.get("/api/rezepte").then(response => {
            setRezeptList(response.data);
            getKategories(response.data);
            console.log(response.data);
        });

    }

    function getKategories(rezeptListUpdate: Rezept[]) {
        for (let i = 0; i < rezeptListUpdate.length; i++) {
            for (let z = 0; z < rezeptListUpdate[i].kategorieList.length; z++) {
                if (!kategorieList.includes(rezeptListUpdate[i].kategorieList[z])) {
                    setKategorieList([...kategorieList, rezeptListUpdate[i].kategorieList[z]]);
                }
            }
        }
    }

    function onCategoryClick(kategorie: string) {
        if (kategorie === "Home") {
            fetchRecipes();
        }
        setRezeptList(rezeptList.filter(rezept => rezept.kategorieList.map(kategorie => kategorie.kategorieName).includes(kategorie)));
    }

    useEffect(() => {
        fetchRecipes();
    }, []);
    console.log(rezeptList)
    return (
        <>
            <Link to={"/"}><h1>#SCHMECKIS</h1></Link>
            <KategorieMenu kategorieList={kategorieList} onCategoryClick={onCategoryClick}/>
            <Routes>
                <Route path={"/"}
                       element={<RezeptGallery rezeptList={rezeptList}/>}/>
            </Routes>

        </>
    )
}

export default App
