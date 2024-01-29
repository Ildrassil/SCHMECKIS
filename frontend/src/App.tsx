import './App.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import CategorieMenu from './components/categories.tsx';
import {Route, Routes} from "react-router-dom";
import RecepieGallery from "./components/RecepieGallery.tsx";

function App() {
    const [categoriesList, setCategoriesList] = useState<string[]>(["REGULAR", "VEGETARIAN", "VEGAN", "DESSERT"])
    const [recipesList, setRecipesList] = useState<string[]>([])

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

    function updateRecipesList(category: string) {
        if (category === "REGULAR") {
            getAllData()
        } else {
            getRecipesByCategory(category)
        }
    }

    function addRecipe(recipe: RecepieRequest) {
        axios.post("/api/recipes", {
            recipeName: recipe.recipeName,
            recipeDescription: recipe.recipeDescription,
            recipeCategory: recipe.recipeCategory,
            recipeIngredients: recipe.recipeIngredients,
            recipeInstructions: recipe.recipeInstructions
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
                       element={<RecepieGallery recipesList={recipesList}/>}/>
            </Routes>

        </>
    )
}

export default App
