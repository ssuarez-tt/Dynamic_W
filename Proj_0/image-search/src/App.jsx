/*
The initial-search effect uses [] because it should run once when the app mounts.
A ref prevents StrictMode's development effect replay from duplicating the API
request. In the memory game, effects use [choices] to resolve a pair and
[hasWon, turns] to update best score. If images were in this effect's dependency
array, setting the response would change images and trigger another request,
repeating until the Unsplash rate limit was exhausted.
*/
import { useEffect, useRef, useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import searchImages from './api'

const DEFAULT_SEARCH = 'mountains'

const fetchImages = async (query, setImages, setIsLoading, setError, setHasSearched) => {
  setIsLoading(true)
  setError('')
  setHasSearched(true)

  try {
    const results = await searchImages(query)
    setImages(results)
  } catch (searchError) {
    console.error('Search error: ', searchError)
    setImages([])
    setError(searchError.message || 'Image search failed. Please try again.')
  } finally {
    setIsLoading(false)
  }
}

const App = () => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH)
  const initialSearchStarted = useRef(false)

  useEffect(() => {
    if (initialSearchStarted.current) return
    initialSearchStarted.current = true
    fetchImages(DEFAULT_SEARCH, setImages, setIsLoading, setError, setHasSearched)
  }, [])

  const handleSearch = (query) => {
    setSearchTerm(query)
    fetchImages(query, setImages, setIsLoading, setError, setHasSearched)
  }

  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Image Search</h1>
      <SearchBar
        onSearch={handleSearch}
        isLoading={isLoading}
        initialQuery={DEFAULT_SEARCH}
      />
      {error && <p role="alert" className="p-4 text-red-700">{error}</p>}
      {hasSearched && <h2 className="px-4 text-xl font-semibold">Images for "{searchTerm}"</h2>}
      {!error && !isLoading && hasSearched && images.length === 0 && (
        <p className="p-4 text-slate-600">Enter a search term to find photos.</p>
      )}
      {images.length > 0 && (
        <section aria-label="Search results" className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((image) => (
            <figure key={image.id} className="overflow-hidden rounded bg-white shadow-sm">
              <img
                src={image.urls.small}
                alt={image.alt_description || image.description || 'Search result'}
                className="h-64 w-full object-cover"
              />
              <figcaption className="p-3 text-sm text-slate-700">
                Photo by{' '}
                <a
                  className="font-medium text-blue-700 underline"
                  href={image.user.links.html}
                  target="_blank"
                  rel="noreferrer"
                >
                  {image.user.name}
                </a>{' '}
                on Unsplash
              </figcaption>
            </figure>
          ))}
        </section>
      )}
    </main>
  )
}

export default App
