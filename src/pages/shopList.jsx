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
        <div>
            <h1>Shopping List</h1>
            <ol>
                {ingredientList.map((ele, index) => {
                    return (
                        <li key={index}>
                            <p>{ele.quantity}, {ele.unit}, {ele.ingredient}</p>
                        <button onClick={()=>{removeIngredient(index)}}>Already Have Ingredient</button>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}
