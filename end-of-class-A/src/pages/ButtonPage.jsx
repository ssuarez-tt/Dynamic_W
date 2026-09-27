import { useState } from 'react'
import recipe from '../RecipeCard/recipe-data'
import Card from '../RecipeCard/Card.jsx'
import RecipeImg from '../RecipeCard/RecipeImg'
import IngredientList from '../RecipeCard/IngredientList'
import InstructionList from '../RecipeCard/InstructionList'
import RecipeInfo from '../RecipeCard/RecipeInfo'
import Button from '../components/Button'
import styles from '../RecipeCard/RecipeCard.module.css'

const ButtonPage = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Card className={styles.buttonCard}>
      <div className={styles.buttonHeader}>
        <h2>{recipe.title}</h2>
        <Button
          className={styles.toggleButton}
          type="button"
          aria-expanded={isOpen}
          aria-controls="button-recipe-details"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? 'Hide recipe' : 'Show recipe'}
        </Button>
      </div>

      {isOpen && (
        <div id="button-recipe-details" className={styles.details}>
          <RecipeImg className={styles.imageFrame} src={recipe.image} alt={recipe.title} />
          <RecipeInfo className={styles.info} recipe={recipe} />
          <h3>Ingredients</h3>
          <IngredientList className={styles.ingredients} ingredients={recipe.ingredients} />
          <InstructionList className={styles.instructions} instructions={recipe.instructions} />
        </div>
      )}
    </Card>
  )
}

export default ButtonPage
