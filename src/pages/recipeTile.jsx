
export function RecipeTile({
    recipe
}) {
    return(
        <li>
            <h2>{recipe.label}</h2>
            <img src={recipe.images.REGULAR.url} alt={recipe.label}/>
            <a href={recipe.url} target="_blank">Recipe Link</a>
            <p>Serves {recipe.yield}</p>   
        </li>
    )
}
