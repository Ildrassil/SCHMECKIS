import './App.css'
import {useState} from "react";
import * as axios from "axios";
import categorieMenu from './components/categories.tsx';

function App() {
  const [categoriesList, setCategoriesList] = useState<string[]>(["REGULAR", "VEGETARIAN", "VEGAN", "DESSERT"])
  const [recipesList, setRecipesList] = useState<string[]>([])

  function getAllData() {
    axios.get('http://localhost:8080/api/recipes').then((response) => {
          setRecipesList(response.data)
        }
    )
  }


  return (
    <>
      <categorieMenu categoriesList={categoriesList}/>
    </>
  )
}

export default App
