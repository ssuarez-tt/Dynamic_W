import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import searchImages from './api'

const App = () => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (query) => {

    console.log("searching for: ", query)
    setIsLoading(true)
    setError('')

    try {
      const results = await searchImages(query)
      setImages(results)
    } catch (searchError) {
      console.error("Search error: ", searchError)
      setImages([])
      setError(searchError.message || 'Image search failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Image Search</h1>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      {error && <p role="alert" className="p-4 text-red-700">{error}</p>}
      {!error && !isLoading && images.length === 0 && (
        <p className="p-4 text-slate-600">Enter a search term to find photos.</p>
      )}
      {images.length > 0 && (
        <section aria-label="Search results" className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.urls.small}
              alt={image.alt_description || image.description || 'Search result'}
              className="h-64 w-full rounded object-cover"
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default App
