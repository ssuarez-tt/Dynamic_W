import recipe from '../RecipeCard/recipe-data'
import Card from '../RecipeCard/Card.jsx'
import RecipeImg from '../RecipeCard/RecipeImg'
import IngredientList from '../RecipeCard/IngredientList'
import InstructionList from '../RecipeCard/InstructionList'
import RecipeInfo from '../RecipeCard/RecipeInfo'
import Button from '../components/Button'
import Accordion from '../components/Accordion'
import styles from '../RecipeCard/RecipeCard.module.css'

const AccordionPage = () => {
  return (
    <Card className={styles.buttonCard}>
      <Accordion
        defaultOpen={true}
        className={styles.accordion}
        contentClassName={styles.details}
        id="recipe-details"
        trigger={({ isOpen, onToggle }) => (
          <div className={styles.buttonHeader}>
            <h2>{recipe.title}</h2>
            <Button
              className={styles.toggleButton}
              type="button"
              aria-expanded={isOpen}
              aria-controls="recipe-details"
              onClick={onToggle}
            >
              {isOpen ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        )}
      >
        <RecipeImg className={styles.imageFrame} src={recipe.image} alt={recipe.title} />
        <RecipeInfo className={styles.info} recipe={recipe} />
        <h3>Ingredients</h3>
        <IngredientList className={styles.ingredients} ingredients={recipe.ingredients} />
        <InstructionList className={styles.instructions} instructions={recipe.instructions} />
      </Accordion>
    </Card>
  )
}

export default AccordionPage
