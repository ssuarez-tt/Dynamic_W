const RecipeInfo = ({ recipe, className }) => {
  return (
    <section className={className}>
      <p>{recipe.title} — A simple recipe.</p>
    </section>
  )
}

export default RecipeInfo
