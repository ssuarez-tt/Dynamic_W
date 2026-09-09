import recipe from './recipe-data'
import Card from './Card.jsx'
import RecipeImg from './RecipeImg'
import IngredientList from './IngredientList'
import InstructionList from './InstructionList'
import RecipeInfo from './RecipeInfo'

const RecipeCard = () => {
  return (
    <Card>
      <h2>{recipe.title}</h2>
      <RecipeImg src={recipe.image} alt={recipe.title} />
      <RecipeInfo recipe={recipe} />
      <h3>Ingredients</h3>
      <IngredientList ingredients={recipe.ingredients} />
      <InstructionList instructions={recipe.instructions} />
    </Card>
  )
}

export default RecipeCard
