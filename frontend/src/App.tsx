import {Link, Route, Routes} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Rezept} from "./models/Rezept.tsx";
import axios from "axios";
import {Kategorie} from "./models/Kategorie.tsx";
import KategorieMenu from "./components/KategorieMenu.tsx";
import RezeptGallery from "./components/RezeptGallery.tsx";
import './App.css';
import DetailPage from "./components/EditPage.tsx";
import {AddRezept} from "./components/AddRezept.tsx";
import {SearchBar} from "./components/SearchBarAutoComplete.tsx";
import Login from "./components/LoginAdmin.tsx";
import {ContextMenu} from "./components/ContextMenu.tsx";
import KategorieGallery from "./components/KategorieGallery.tsx";
import {PlusIcon} from "lucide-react";


function App() {
    const [kategorieList, setKategorieList] = useState<Kategorie[]>([]);
    const [rezeptList, setRezeptList] = useState<Rezept[]>([]);
    const [logIN, setLogIN] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [kategorienGallery, setKategorienGallery] = useState<boolean>(false);
    const items = ['AdminLogin'];



    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(event.target.value.toLowerCase());
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

            </div>
                    {!kategorienGallery && <KategorieMenu onCategoryClick={onCategoryClick}/>}
            <div className={"flex flex-col bg-offWhite align-middle self-center justify-center border-none ml-35"}>
                <SearchBar handleOnChange={handleOnChange}/>
            </div>
                    {loggedIn && <div className="flex flex-row justify-center">
                        <Link to={"/addRezept"}>
                            <PlusIcon size={55} className=
                                {"flex-wrap p-4 m-8 justify-center rounded-2xl flex-row bg-offWhite shadow-buttonOut " +
                                    "hover:shadow-buttonIn active:shadow-buttonIn"}/>
                        </Link>
                    </div>}
                </div>}
            <Routes>
                <Route path={"/admin/login"}
                       element={<Login setLoggedIn={setLoggedIn} setLogIn={setLogIN} redirect={true}/>}/>
                <Route path={"/"}
                       element={<RezeptGallery searchTerm={searchTerm} rezeptList={rezeptList}/>}/>
                <Route path={`/rezept/:rezeptId`}
                       element={<DetailPage setKategorie={onCategoryClick} loggedIn={loggedIn}/>}/>
                <Route path={"/addRezept"} element={<AddRezept setLoggedIn={setLoggedIn} setLogIn={setLogIN}/>}/>
                <Route path={"/kategorie/:kategorieName"}
                       element={<KategorieGallery setKategorienGallery={setKategorienGallery} searchTerm={searchTerm}
                                                  kategorieList={kategorieList}/>}/>
            </Routes>
        </>
    )
}

export default App
