import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
  clearCollection,
  removeArt,
  selectCollectionIsEmpty,
  selectSortOrder,
  selectVisibleArt,
  sortOrderChanged,
} from '../store'

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)

const ArtList = () => {
  const dispatch = useDispatch()
  const visibleArt = useSelector(selectVisibleArt)
  const sortOrder = useSelector(selectSortOrder)
  const collectionIsEmpty = useSelector(selectCollectionIsEmpty)
  const [confirmClear, setConfirmClear] = useState(false)

  const handleClear = () => {
    dispatch(clearCollection())
    setConfirmClear(false)
  }

  return (
    <section aria-label="Art collection">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-ink px-5 py-3">
        <h2 className="text-xs font-black uppercase tracking-widest">Collection</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => dispatch(sortOrderChanged(sortOrder === 'desc' ? 'asc' : 'desc'))}
            className="min-h-11 border-4 border-ink px-3 py-2 text-xs font-black uppercase"
          >
            Price: {sortOrder === 'desc' ? 'High to low ↓' : 'Low to high ↑'}
          </button>
          {!collectionIsEmpty && !confirmClear && (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              className="min-h-11 border-4 border-ink px-3 py-2 text-xs font-black uppercase text-flat-red"
            >
              Clear collection
            </button>
          )}
        </div>
      </div>

      {confirmClear && (
        <div role="alertdialog" aria-labelledby="clear-confirm-title" className="border-b-4 border-ink bg-flat-yellow p-4">
          <p id="clear-confirm-title" className="text-sm font-bold">
            Clear every piece from the collection? This cannot be undone.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="min-h-11 border-4 border-ink bg-flat-red px-3 py-2 text-xs font-black uppercase text-paper"
            >
              Yes, clear collection
            </button>
            <button
              type="button"
              onClick={() => setConfirmClear(false)}
              className="min-h-11 border-4 border-ink bg-paper px-3 py-2 text-xs font-black uppercase"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {visibleArt.length === 0 ? (
        <p className="px-5 py-8 text-sm">
          {collectionIsEmpty
            ? 'Nothing in the collection yet.'
            : 'No pieces match this search.'}
        </p>
      ) : (
        <ul className="border-b-4 border-ink">
          {visibleArt.map((art) => (
            <li
              key={art.id}
              className="flex flex-col gap-2 border-b-4 border-ink px-5 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="break-words text-sm font-black uppercase">
                {art.name} <span className="font-normal">{formatPrice(art.price)}</span>
              </p>
              <button
                type="button"
                onClick={() => dispatch(removeArt(art.id))}
                className="min-h-11 self-start border-4 border-ink bg-flat-red px-3 py-2 text-xs font-black uppercase text-paper sm:self-auto"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ArtList
