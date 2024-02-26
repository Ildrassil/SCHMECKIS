import {Link, Route, Routes, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Rezept} from "./models/Rezept.tsx";
import axios from "axios";
import {Kategorie} from "./models/Kategorie.tsx";
import KategorieMenu from "./components/KategorieMenu.tsx";
import RezeptGallery from "./components/RecepieGallery.tsx";
import './App.css';
import DetailPage from "./components/EditPage.tsx";
import {AddRezept} from "./components/AddRezept.tsx";
import {SearchBar} from "./components/SearchBarAutoComplete.tsx";
import Login from "./components/LoginAdmin.tsx";
import {ContextMenu} from "./components/ContextMenu.tsx";


function App() {
    const [kategorieList, setKategorieList] = useState<Kategorie[]>([]);
    const [rezeptList, setRezeptList] = useState<Rezept[]>([]);
    const [logIN, setLogIN] = useState<boolean>(false);
    const [filteredRezepte, setFilteredRezepte] = useState<Rezept[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const items = ['AdminLogin'];
    const nav = useNavigate();

    const onClick = (item: string) => {
        if (item === "AdminLogin") {
            nav("/admin/login");
        } else {
            console.log("Error");
        }
    }

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
        if (kategorie === "kategorien") {
            fetchRecipes();
        }
        setRezeptList(rezeptList.filter(rezept => rezept.kategorieList.map(kategorie => kategorie.kategorieName.toLowerCase()).includes(kategorie)));
    }



    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <>
            {!logIN && <ContextMenu items={items}/>}

            {!logIN &&
                <div>
                    <div className="Header">
                <Link to={"/"}><h1 className="HeadLine justify-center sticky align-middle text-4xl text-center font-semibold
                fontfamily-roboto font-sans
                text-textHeader
                pt-32 m-2">#SCHMECKIS</h1></Link>
                {loggedIn && <Link to={"/addRezept"}>+</Link>}
            </div>
            <KategorieMenu onCategoryClick={onCategoryClick}/>
            <div className={"flex flex-col bg-offWhite align-middle self-center justify-center border-none ml-35"}>
                <SearchBar kategorieList={kategorieList} rezeptList={rezeptList} setFilteredRezepte={setRezeptList}/>
            </div>
                </div>}
            <Routes>
                <Route path={"/admin/login"} element={<Login setLoggedIn={setLoggedIn} setLogIn={setLogIN}/>}/>
                <Route path={"/"}
                       element={<RezeptGallery rezeptList={rezeptList}/>}/>
                <Route path={`/rezept/:rezeptId`} element={<DetailPage setKategorie={onCategoryClick}/>}/>
                <Route path={"/addRezept"} element={<AddRezept/>}/>
            </Routes>

        </>
    )
}

export default App
