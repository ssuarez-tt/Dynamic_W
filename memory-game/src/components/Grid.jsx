import Card from './Card'
import { useEffect, useState } from 'react'
import Spain from '../assets/Flag_of_the_Kingdom_of_Spain.svg.png'
import France from '../assets/Flag_of_France.svg.png'
import England from '../assets/Flag_of_England.svg.png'
import Argentina from '../assets/Flag_of_Argentina.svg.png'

const cardImages = [
  { src: Spain, name: 'Spain' },
  { src: France, name: 'France' },
  { src: England, name: 'England' },
  { src: Argentina, name: 'Argentina' }
]

const createDeck = () => {
  const deck = cardImages.flatMap((card) => [
    { ...card, id: `${card.name}-1` },
    { ...card, id: `${card.name}-2` }
  ])

  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]]
  }

  return deck
}

const Grid = () => {
  const [cards, setCards] = useState(createDeck)
  const [choices, setChoices] = useState([])
  const [matchedIds, setMatchedIds] = useState([])
  const [turns, setTurns] = useState(0)
  const [bestScore, setBestScore] = useState(null)
  const hasWon = matchedIds.length === cards.length

  useEffect(() => {
    if (choices.length !== 2) return undefined

    const [firstChoice, secondChoice] = choices
    setTurns((currentTurns) => currentTurns + 1)

    if (firstChoice.src === secondChoice.src) {
      setMatchedIds((currentIds) => [...currentIds, firstChoice.id, secondChoice.id])
    }

    const timeoutId = window.setTimeout(() => setChoices([]), 800)
    return () => window.clearTimeout(timeoutId)
  }, [choices])

  useEffect(() => {
    if (!hasWon) return

    setBestScore((currentBest) =>
      currentBest === null || turns < currentBest ? turns : currentBest
    )
  }, [hasWon, turns])

  const handleCardClick = (card) => {
    if (
      choices.length === 2 ||
      matchedIds.includes(card.id) ||
      choices.some((choice) => choice.id === card.id)
    ) {
      return
    }

    setChoices((currentChoices) => [...currentChoices, card])
  }

  const handleNewGame = () => {
    setCards(createDeck())
    setChoices([])
    setMatchedIds([])
    setTurns(0)
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex flex-wrap items-end gap-6">
        <div>
          <p className="text-lg font-semibold" aria-live="polite">Turns: {turns}</p>
          <p className="text-sm text-slate-600">
            Best: {bestScore === null ? '—' : `${bestScore} turns`}
          </p>
        </div>
        <button
          type="button"
          className="rounded bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
          onClick={handleNewGame}
        >
          New Game
        </button>
      </div>
      {hasWon && <p className="mb-4 font-bold text-green-700">You won in {turns} turns!</p>}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cards.map((card) => {
          const isMatched = matchedIds.includes(card.id)
          const isFlipped = isMatched || choices.some((choice) => choice.id === card.id)

          return (
            <Card
              key={card.id}
              card={card}
              isFlipped={isFlipped}
              isMatched={isMatched}
              onClick={() => handleCardClick(card)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Grid
