import "./App.css";
import { useState } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import { RecipeHome, ShopList, RecipeList } from "./pages";

const projectKey = process.env.REACT_APP_PROJECT_KEY; 
const applicationKey = process.env.REACT_APP_APPLICATION_KEY; 

function App() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  //sends fetch request on text input submit with inputText
  //allRecipes is array of objects 0-19 with link to next 20
  function getRecipes() {
    const fetchRecipe = fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${inputText}&app_id=${projectKey}&app_key=${applicationKey}`
    );
    fetchRecipe
      .then((res) => res.json())
      .then((data) => {
        setAllRecipes(data);
      })
      .catch((err) => console.error(err));
  }

  //handles the text input to search for recipes based on ingredient
  function handleSubmit(event) {
    event.preventDefault();
    getRecipes();
  }

  //function to handle input text change on recipeHome component
  function handleTextChange(event) {
    setInputText(event.target.value);
  }

  //called on button click to save selected recipe to the saved recipe array. Button contains array location for recipe on allRecipes
  function saveRecipe(event) {
    event.preventDefault();
    let newRecipe = allRecipes.hits[event.target.value];
    setMyRecipes((myRecipes) => [...myRecipes, newRecipe]);
  }

  //remove recipe from myRecipe on button click in recipeList component. Filters recipe list for name value attached to button
  function removeRecipe(event) {
    event.preventDefault();
    const name = event.target.value;
    setMyRecipes(myRecipes.filter(ele => ele.recipe.label != name ))
  }

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Recipes Home</NavLink>
            </li>
            <li>
              <NavLink to="shopList">Shopping List</NavLink>
            </li>
            <li>
              <NavLink to="recipeList">My Recipes</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <RecipeHome
                allRecipes={allRecipes}
                handleSubmit={handleSubmit}
                getRecipes={getRecipes}
                inputText={inputText}
                handleTextChange={handleTextChange}
                saveRecipe={saveRecipe}
              />
            }
          ></Route>
          <Route path="shopList" element={<ShopList myRecipes = {myRecipes} />}></Route>
          <Route
            path="recipeList"
            element={
              <RecipeList 
              myRecipes={myRecipes} 
              removeRecipe={removeRecipe} />
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
