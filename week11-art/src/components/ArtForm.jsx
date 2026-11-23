import {useDispatch, useSelector} from 'react-redux'
import {addArt, changeName, changePrice} from '../store'

const ArtForm = () => {
  const dispatch = useDispatch()
  const name = useSelector((state) => state.form.name)
  const price = useSelector((state) => state.form.price)

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return

    dispatch(addArt({name: trimmedName, price}))
  }

  return (
    <section className="border-b-4 border-ink p-5">
      <h2 className="mb-3 text-xs font-black uppercase tracking-widest">
        Add a piece
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label className="block text-xs font-black uppercase" htmlFor="name">
            Artist and title
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => dispatch(changeName(event.target.value))}
            placeholder="Mondrian, Composition II"
            className="mt-1 min-h-11 w-full border-4 border-ink bg-white px-3 py-2"
          />
        </div>
        <div className="sm:w-32">
          <label className="block text-xs font-black uppercase" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            min="0"
            value={price || ''}
            onChange={(event) => {
              const nextPrice = Number.parseInt(event.target.value, 10) || 0
              dispatch(changePrice(Math.max(0, nextPrice)))
            }}
            className="mt-1 min-h-11 w-full border-4 border-ink bg-white px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="min-h-11 border-4 border-ink bg-flat-yellow px-4 py-2 text-xs font-black uppercase tracking-widest"
        >
          Add
        </button>
      </form>
    </section>
  )
}

export default ArtForm
