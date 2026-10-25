import {useState} from 'react'
import BookForm from './components/BookForm'
import BookList from './components/BookList'

const App = () => {
  const [books, setBooks] = useState([])

  const addBook = async (book) => {
    await new Promise((resolve) => window.setTimeout(resolve, 800))
    setBooks((currentBooks) => [
      ...currentBooks,
      {...book, id: crypto.randomUUID()},
    ])
  }

  return (
    <main className="mx-auto w-full max-w-xl p-4 sm:p-8">
      <h1 className="mb-6 text-3xl font-bold">Reading List</h1>
      <BookForm onAdd={addBook} />
      <BookList books={books} />
    </main>
  )
}

export default App
