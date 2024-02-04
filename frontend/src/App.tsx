import './App.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import CategorieMenu from './components/categories.tsx';
import {Route, Routes} from "react-router-dom";
import RecepieGallery from "./components/RecepieGallery.tsx";
import {Recepie} from "./components/Recepie.tsx";
import {RecepieRequest} from "./components/RecepieRequest.tsx";

function App() {
    const [categoriesList, setCategoriesList] = useState<string[]>(["REGULAR", "VEGETARIAN", "VEGAN", "DESSERT"])
    const [recipesList, setRecipesList] = useState<Recepie[]>([])

    function getAllData() {
        axios.get('http://localhost:8080/api/recipes').then((response) => {
                setRecipesList(response.data)
            }
        )
    }

    function getRecipesByCategory(category: string) {
        axios.get(`http://localhost:8080/api/recipes/${category}`).then((response) => {
                setRecipesList(response.data)
            }
        )
    }

    function updateCategoryList(category: string) {
        if (category === "REGULAR" || category === "VEGETARIAN" || category === "VEGAN" || category === "DESSERT") {
            getAllData()
        } else {
            setCategoriesList([...categoriesList, category])
        }
    }

    function deleteRecipe(recipe: Recepie) {
        axios.delete<boolean>(`http://localhost:8080/api/recipes/${recipe.id}`).then((response) => {
                if (response.data === true) {
                    const id = recipe.id;
                    setRecipesList(recipesList.filter(recipe => recipe.id !== id))
                }
            }
        )
    }

    function updateRecipe(recepie: Recepie) {
        axios.put<boolean>(`http://localhost:8080/api/recipes/${recipe.id}`, {
            recipeName: recepie.recepieName,
            recipeDescription: recepie.recepieDescription,
            recipeCategory: recepie.recepieCategory,
            recipeIngredients: recepie.recepieIngredients,
            recipeInstructions: recepie.recepieInstructions,
            recipeImage: recepie.recepieImage
        }).then((response) => {
                if (response.data === true) {
                    const id = recepie.id;
                    setRecipesList(recipesList.filter(recipe => recipe.id !== id))
                }
            }
        )
    }

    function updateRecipeList(recipe: Recepie) {
        const id = recipe.id;
        setRecipesList(recipesList.filter(recipe => recipe.id !== id))
    }

    function addRecipe(recipe: RecepieRequest) {
        axios.post("/api/recipes", {
            recipeName: recipe.recepieName,
            recipeDescription: recipe.recepieDescription,
            recipeCategory: recipe.recepieCategory,
            recipeIngredients: recipe.recepieIngredients,
            recipeInstructions: recipe.recepieInstructions
        }).then(response =>
            setRecipesList([...recipesList, response.data]))
    }


    useEffect(() => {
        getAllData()

    }, [])

    return (
        <>
            <h1>#SCHMECKIS</h1>
            <CategorieMenu categoriesList={categoriesList}/>
            <Routes>
                <Route path={"/"}
                       element={<RecepieGallery recepiesList={recipesList}/>}/>
            </Routes>

        </>
    )
}

export default App
