import { useState } from 'react'
import cx from 'classnames'
import recipe from './RecipeCard/recipe-data'
import Card from './RecipeCard/Card.jsx'
import RecipeImg from './RecipeCard/RecipeImg'
import IngredientList from './RecipeCard/IngredientList'
import InstructionList from './RecipeCard/InstructionList'
import RecipeInfo from './RecipeCard/RecipeInfo'
import styles from './RecipeCard/RecipeCard.module.css'

const secondRecipe = {
  ...recipe,
  title: 'Milk Tea without Condensed Milk',
  ingredients: recipe.ingredients.filter(
    (ingredient) => ingredient.name !== 'Condensed Milk'
  ),
  instructions: [
    'Boil the water and steep the black tea for 3–5 minutes.',
    'Mix sugar and whole milk until dissolved.',
    'Combine tea with milk and sugar mixture.',
    'Serve hot or chilled.'
  ]
}

const ConnectedAccordionPage = (props) => {
  const { items = [recipe, secondRecipe] } = props
  const [openIndexes, setOpenIndexes] = useState([])

  const handleClick = (index) => {
    setOpenIndexes((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    )
  }

  return (
    <div className={styles.listContainer}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index)

        return (
          <div key={`${item.title}-${index}`} className={styles.listItemWrap}>
            <Card
              className={cx(styles.squareCard, {
                [styles.squareCardOpen]: isOpen
              })}
            >
              <div
                className={styles.listHeader}
                onClick={() => handleClick(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    handleClick(index)
                  }
                }}
                aria-expanded={isOpen}
              >
                <span className={styles.listIndex}>{String(index + 1).padStart(2, '0')}</span>
                <h2>{item.title}</h2>
                <span className={styles.chevron}>{isOpen ? '−' : '+'}</span>
              </div>

              {isOpen && (
                <div className={styles.details}>
                  <RecipeImg className={styles.imageFrame} src={item.image} alt={item.title} />
                  <RecipeInfo className={styles.info} recipe={item} />
                  <h3>Ingredients</h3>
                  <IngredientList className={styles.ingredients} ingredients={item.ingredients} />
                  <InstructionList className={styles.instructions} instructions={item.instructions} />
                </div>
              )}
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default ConnectedAccordionPage
