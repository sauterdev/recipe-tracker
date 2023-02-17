import { useState, useEffect } from "react";
import {parse, combine} from "recipe-ingredient-parser-v3";

export function ShopList(
    {myRecipes}
) {
    const [ingredientList, setIngredientList] = useState([]);

    const ingredientArr =[]
    const ingredientObjects = []


    //builds array of ingredient strings
    function buildIngredientArray(myRecipes) {
        myRecipes.map((singleRecipe) => {
            singleRecipe.recipe.ingredients.map((ingredient) =>{
                ingredientArr.push(ingredient.quantity.toString() + " " + ingredient.measure + " " + ingredient.food)})
        })
    }

    // Uses ingredient parse API to build array of objects to combine
    function buildIngredientObjects(ingredientArr) {
        for (let i = 0; i < ingredientArr.length; i++) {
            let ingredientObject = parse(ingredientArr[i], 'eng')
            ingredientObjects.push(ingredientObject);
        }
    } 
    buildIngredientArray(myRecipes);
    buildIngredientObjects(ingredientArr);

    //usese ingredient parse API combine method to join like ingredients
    let consolidatedIngredients = combine(ingredientObjects);
    
    //set state to render shopping list
    useEffect(()=> {
        setIngredientList(consolidatedIngredients)
    }, [myRecipes])
    
    //removes ingredient from shopping list on button click, rerenders shopping list
    function removeIngredient(index) {
        //create temp array copy of ingredientList. Do not want to direct adjust state
        const temp = [...ingredientList]
        temp.splice(index, 1);
        setIngredientList(temp);
    }

    return (
        <div className="flex flex-col items-center p-10 h-full">
            <div className="h-20 mt-10">
            <h1 className="text-3xl underline text-center">Shopping List</h1>
            </div>
            <ol className="flex flex-col gap-10 ">
                {ingredientList.map((ele, index) => {
                    return (
                        <li
                        className="flex justify-between gap-20"
                        key={index}>
                            {/* ternaries and filters to remove non-descript ingredient terms */}
                            <p>{ (ele.quantity == 0 || ele.quantity == "q.b." ? "" : ele.quantity + " ")}
                            {(ele.unit == "q.b." ? "" : ele.unit)}
                             {" " + (ele.ingredient.replace("<unit>", " ").replace("null", ""))}</p>
                        <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                         onClick={()=>{removeIngredient(index)}}>Remove</button>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}
