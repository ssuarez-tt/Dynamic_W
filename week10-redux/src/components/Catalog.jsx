import {useDispatch, useSelector} from 'react-redux'
import {PRINTS} from '../data/prints'
import {itemAdded} from '../features/cartSlice'
import {favouriteToggled, selectFavouriteIds} from '../features/favouritesSlice'
import {
  favouritesFilterToggled,
  filterChanged,
  selectColourFilter,
  selectFavouritesOnly,
} from '../features/uiSlice'

const SWATCH = {
  red: 'bg-flat-red',
  blue: 'bg-flat-blue',
  yellow: 'bg-flat-yellow',
}
const FILTERS = ['all', 'red', 'blue', 'yellow']

const Catalog = () => {
  const dispatch = useDispatch()
  const colourFilter = useSelector(selectColourFilter)
  const favouritesOnly = useSelector(selectFavouritesOnly)
  const favouriteIds = useSelector(selectFavouriteIds)

  const visiblePrints = PRINTS.filter((print) => {
    const matchesColour = colourFilter === 'all' || print.colour === colourFilter
    const matchesFavourites = !favouritesOnly || favouriteIds.includes(print.id)
    return matchesColour && matchesFavourites
  })

  return (
    <section aria-label="Print catalog">
      <div className="flex flex-wrap border-b-4 border-ink">
        {FILTERS.map((filter) => {
          const isActive = !favouritesOnly && filter === colourFilter
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              onClick={() => dispatch(filterChanged(filter))}
              className={`min-h-11 flex-1 border-r-4 border-ink px-3 py-2 text-xs font-black uppercase ${
                isActive ? 'bg-ink text-paper' : 'bg-paper'
              }`}
            >
              {filter}
            </button>
          )
        })}
        <button
          type="button"
          aria-pressed={favouritesOnly}
          onClick={() => dispatch(favouritesFilterToggled())}
          className={`min-h-11 flex-1 px-3 py-2 text-xs font-black uppercase ${
            favouritesOnly ? 'bg-flat-red text-paper' : 'bg-paper'
          }`}
        >
          ★ Favourites
        </button>
      </div>

      {visiblePrints.length === 0 ? (
        <p className="border-b-4 border-ink px-4 py-8 text-sm">
          No favourites in this view yet. Save a print with the star.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2">
          {visiblePrints.map((print) => {
            const isFavourite = favouriteIds.includes(print.id)
            return (
              <li key={print.id} className="border-b-4 border-r-4 border-ink">
                <div className={`relative h-32 ${SWATCH[print.colour]}`}>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 h-16 w-16 border-4 border-ink bg-paper"
                  />
                  <button
                    type="button"
                    aria-label={`${isFavourite ? 'Remove' : 'Add'} ${print.title} ${isFavourite ? 'from' : 'to'} favourites`}
                    aria-pressed={isFavourite}
                    onClick={() => dispatch(favouriteToggled(print.id))}
                    className={`absolute right-3 top-3 min-h-11 min-w-11 border-4 border-ink text-2xl leading-none ${
                      isFavourite ? 'bg-flat-yellow' : 'bg-paper'
                    }`}
                  >
                    {isFavourite ? '★' : '☆'}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 px-3 py-3">
                  <div className="min-w-0">
                    <p className="break-words text-sm font-black uppercase">{print.title}</p>
                    <p className="text-xs">${print.price}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => dispatch(itemAdded(print))}
                    className="min-h-11 shrink-0 border-4 border-ink bg-flat-yellow px-3 py-1 text-xs font-black uppercase"
                  >
                    Add
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default Catalog
