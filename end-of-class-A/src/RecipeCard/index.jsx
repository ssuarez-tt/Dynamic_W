import recipe from './recipe-data'
import Card from './Card.jsx'
import RecipeImg from './RecipeImg'
import IngredientList from './IngredientList'
import InstructionList from './InstructionList'
import RecipeInfo from './RecipeInfo'
import Button from '../components/Button'
import Accordion from '../components/Accordion'
import styles from './RecipeCard.module.css'

const RecipeCard = () => {
  return (
    <Card className={styles.card}>
      <Accordion
        defaultOpen={true}
        className={styles.accordion}
        contentClassName={styles.details}
        id="recipe-details"
        trigger={({ isOpen, onToggle }) => (
          <div className={styles.header}>
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

export default RecipeCard
