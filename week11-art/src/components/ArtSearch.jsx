import {useDispatch, useSelector} from 'react-redux'
import {changeSearchTerm} from '../store'

const ArtSearch = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector((state) => state.art.searchTerm)

  return (
    <section className="flex flex-col gap-2 border-b-4 border-ink p-5 sm:flex-row sm:items-center">
      <label className="text-xs font-black uppercase tracking-widest" htmlFor="search">
        Search
      </label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(event) => dispatch(changeSearchTerm(event.target.value))}
        placeholder="Filter by name"
        className="min-h-11 min-w-0 flex-1 border-4 border-ink bg-white px-3 py-2"
      />
    </section>
  )
}

export default ArtSearch
