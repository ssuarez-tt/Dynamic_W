import styles from './Card.module.css'
import cx from 'classnames'
import CardPattern from '../assets/moroccan-flower-dark.png'

// The card knows how one card LOOKS. It does not know the rules of the game,
// and by the end of class it still will not.
const Card = (props) => {
  const { card, isFlipped, isMatched, onClick } = props

  return (
    <button
      type="button"
      className={cx(styles.card, {
        [styles.flipped]: isFlipped,
        [styles.matched]: isMatched
      })}
      onClick={onClick}
      disabled={isMatched}
      aria-label={isFlipped ? `${card.name} flag` : 'Reveal hidden flag'}
    >
      <div className={styles.inner}>
        <div className={styles.front}>
          <img src={CardPattern} alt="" />
        </div>
        <div className={styles.back}>
          <img src={card.src} alt={card.name} />
        </div>
      </div>
    </button>
  )
}

export default Card
