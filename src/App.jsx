import logo from './logo.svg';
import './App.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import { recipeHome, indivRecipe, shopList, recipeList } from './pages';

function App() {
  return (
    <BrowserRouter>
    <div >
      <nav>
        <ul>
          <li><NavLink to ="/">Recipes Home</NavLink></li>
          <li><NavLink to ="shopList">Shopping List</NavLink></li>
          <li><NavLink to ="recipeList">My Recipes</NavLink></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element ={<recipeHome />}></Route>
        <Route path="shopList" element={<shopList />}></Route>
        <Route path="recipeList" element={<recipeList />}></Route>
        <Route path="indivRecipe" element={<indivRecipe />}></Route>
      </Routes>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
