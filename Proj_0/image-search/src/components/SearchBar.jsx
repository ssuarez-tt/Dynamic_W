import {useState} from 'react'

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('')

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedQuery = query.trim()
    if (trimmedQuery) onSearch(trimmedQuery)
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={handleChange}
          aria-label="Search images"
          className='border border-gray-300 rounded px-3 py-2 w-80'
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  )
}

export default SearchBar