import "./index.css";
import { useState } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import { RecipeHome, ShopList, RecipeList } from "./pages";
import utensil from "./pages/img/utensil.jpg";

const projectKey = process.env.REACT_APP_PROJECT_KEY;
const applicationKey = process.env.REACT_APP_APPLICATION_KEY;

function App() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [inputText, setInputText] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [prevPages, setPrevPages] = useState([]);
  const [pageCounter, setPageCounter] = useState(0);

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
    setMyRecipes(myRecipes.filter((ele) => ele.recipe.label != name));
  }

  // loads next 20 recipes. If page has been visited already, it resets the state to the saved array. Otherwise, runs a new API fetch
  function loadNextRecPage(event) {
    //check if next page exists
    if (prevPages[pageCounter + 1]) {
      
      setAllRecipes(prevPages[pageCounter + 1]);
      setPageCounter(pageCounter + 1);
      // else run api call
    } else {
      setPrevPages([...prevPages, allRecipes]);
      setPageCounter(pageCounter + 1);
      const fetchRecipe = fetch(allRecipes._links.next.href);
      fetchRecipe
        .then((res) => res.json())
        .then((data) => {
          setAllRecipes(data);
        })
        .catch((err) => console.error(err));
    }
  }

  //returns to previous recipe page based on prevPages. Prevents if at first page.
  function loadPrevRecPage(event) {
    if (pageCounter != 0) {
      setAllRecipes(prevPages[pageCounter - 1]);
      setPageCounter(pageCounter - 1);
    }
  }

  return (
    <div className="bg-amber-400 h-screen absolute top-0 left-0 w-full">
      <div className="scroll-smooth">
      <BrowserRouter>
        <div className="flex font-mono h-full bg-amber-400">
          <div className="flex flex-col h-full">
            <img
              className="border-2 border-orange-400"
              src={utensil}
              alt="Knife and Fork logo"
            ></img>
            <nav className="h-full border-2 border-orange-400">
              <ul className="flex flex-col gap-5 mt-5 items-center font-medium text-blue-600">
                <li className="hover:underline">
                  <NavLink to="/">Recipes Home</NavLink>
                </li>
                <li className="hover:underline">
                  <NavLink to="shopList">Shopping List</NavLink>
                </li>
                <li className="hover:underline">
                  <NavLink to="recipeList">My Recipes</NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="w-full">
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
                    loadNextRecPage={loadNextRecPage}
                    loadPrevRecPage={loadPrevRecPage}
                  />
                }
              ></Route>
              <Route
                path="shopList"
                element={<ShopList myRecipes={myRecipes} />}
              ></Route>
              <Route
                path="recipeList"
                element={
                  <RecipeList
                    myRecipes={myRecipes}
                    removeRecipe={removeRecipe}
                  />
                }
              ></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
