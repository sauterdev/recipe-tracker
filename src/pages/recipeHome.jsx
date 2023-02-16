import { RecipeTile } from "./recipeTile";

export function RecipeHome({
  allRecipes,
  handleSubmit,
  getRecipes,
  inputText,
  handleTextChange,
  saveRecipe,
}) {
  

  return (
    <div>
      <h1>Recipe Home</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="foodInput"
          id="foodInput"
          value={inputText}
          onChange={handleTextChange}
        ></input>
      </form>
      {/* Build recipes from allRecipe array */}
      <ol>
        {allRecipes.length != 0 &&
          allRecipes.hits.map((ele, index) => {
            return (
              <div key={index}>
                <RecipeTile  recipe={ele.recipe} />
                <button //button stays on parent element to keep information on selected recipe
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
    </div>
  );
}
