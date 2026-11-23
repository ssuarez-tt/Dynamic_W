import {useSelector} from 'react-redux'
import {selectTotalValue, selectVisibleArtCount} from '../store'

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)

const ArtValue = () => {
  const count = useSelector(selectVisibleArtCount)
  const total = useSelector(selectTotalValue)

  return (
    <section
      aria-live="polite"
      className="flex flex-wrap items-center justify-between gap-2 bg-ink px-5 py-3 text-paper"
    >
      <span className="text-xs font-black uppercase tracking-widest">
        {count} {count === 1 ? 'piece' : 'pieces'} · visible value
      </span>
      <span className="text-lg font-black">{formatPrice(total)}</span>
    </section>
  )
}

export default ArtValue
