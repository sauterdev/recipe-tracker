import { RecipeTile } from "./recipeTile";

export function RecipeHome({
  allRecipes,
  handleSubmit,
  getRecipes,
  inputText,
  handleTextChange,
  saveRecipe,
  loadNextRecPage,
  loadPrevRecPage,
}) {
  return (
    <div className="flex flex-col h-full bg-amber-400">
      <div className="flex flex-col items-center border-2 border-orange-400 p-10">
        <h1 className="text-center text-3xl">Recipe Home</h1>
        <form
          className="bg-slate-100 shadow-xl rounded px-8 pt-1 pb-1 mb-1 md:w-1/2 w-full text-center border-3 border-black "
          onSubmit={handleSubmit}
        >
          <input
            className="w-full bg-slate-100 text-center"
            type="text"
            name="foodInput"
            id="foodInput"
            placeholder="Enter Ingredients, Hit Enter"
            value={inputText}
            onChange={handleTextChange}
          ></input>
        </form>
      </div>

      {/* Build recipes from allRecipe array */}
      <div className="h-full">
        <ol className="flex flex-wrap gap-10 justify-evenly p-5">
          {allRecipes.length != 0 &&
            allRecipes.hits.map((ele, index) => {
              return (
                <div
                  className="flex flex-col items-center justify-between md:w-1/4 3/4 rounded border-2 border-orange-400 p-5 bg-amber-200"
                  key={index}
                >
                  <RecipeTile recipe={ele.recipe} />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" //button stays on parent element to keep information on selected recipe
                    type="submit"
                    id={ele.recipe.label}
                    value={index}
                    onClick={saveRecipe}
                  >
                    Save Recipe
                  </button>
                </div>
              );
            })}
        </ol>
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            type="submit"
            onClick={loadPrevRecPage}
            id="prevButton"
          >
            Prev Page
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            type="submit"
            onClick={loadNextRecPage}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
