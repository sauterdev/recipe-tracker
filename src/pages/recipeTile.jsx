export function RecipeTile({ recipe }) {
  return (
    <li className="flex flex-col items-center gap-3 bg-amber-200">
      <h2 className="text-center font-semibold">{recipe.label}</h2>
      <img
        className="border-2 border-orange-400"
        src={recipe.images.REGULAR.url}
        alt={recipe.label}
      />
      <a
        className="font-medium text-blue-600 hover:underline"
        href={recipe.url}
        target="_blank"
      >
        {recipe.source}
      </a>
      <p>Serves {recipe.yield}</p>
    </li>
  );
}
