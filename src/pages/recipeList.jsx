export function RecipeList(
    {
        myRecipes,
        removeRecipe
    }
) {

    console.log(myRecipes)
    return (
        <div className="flex flex-col items-center m-10 h-full">
            <div className="h-20 mt-10">
            <h1 className="text-3xl underline text-center">Recipe List</h1>
            </div>
            <div >
            <ol className="flex flex-col gap-10 ">
                { 
                myRecipes.map((ele, index) => {
                    return (
                        <li 
                        className="flex md:flex-row md:justify-between md:gap-20 flex-col items-center"
                        key={index}>
                            <p className="text-center" >{ele.recipe.label}</p>
                            <a 
                            className= "font-medium text-blue-600 dark:text-blue-500" href={ele.recipe.url} target="_blank">Go To Recipe>>></a>
                            <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                            id={ele.recipe.label}
                            value={ele.recipe.label}
                            onClick={removeRecipe}>Remove</button>
                        </li>    
                    )
                })}
            </ol>
            </div>
        </div>
    )
}
