export function RecipeList(
    {
        myRecipes,
        removeRecipe
    }
) {

    console.log(myRecipes)
    return (
        <div>
            <h1>Recipe List</h1>
            <ol>
                { 
                myRecipes.map((ele, index) => {
                    return (
                        <li key={index}>
                            <p>{ele.recipe.label}</p>
                            <a href={ele.recipe.url} target="_blank">Go To Recipe>>></a>
                            <button
                            type="submit"
                            id={ele.recipe.label}
                            value={ele.recipe.label}
                            onClick={removeRecipe}>Remove Recipe</button>
                        </li>    
                    )
                })}
            </ol>
        </div>
    )
}
