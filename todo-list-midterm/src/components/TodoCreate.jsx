import {useState} from 'react'
import useTodosContext from '../../hoooks/use-todos-context'

const TodoCreate = () => {
  const {createTodo} = useTodosContext()
  const [title, setTitle] = useState('')
  const [totalPages, setTotalPages] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handlePagesChange = (event) => {
    setTotalPages(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const created = await createTodo(title.trim(), Number(totalPages))
    if (created) {
      setTitle('')
      setTotalPages('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_8rem_auto] sm:items-end">
      <div>
        <label htmlFor="new-book-title" className="block text-sm font-medium">
          Book title
        </label>
        <input
          id="new-book-title"
          type="text"
          required
          maxLength="120"
          value={title}
          onChange={handleTitleChange}
          placeholder="Book title"
          className="mt-1 min-h-11 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="new-book-pages" className="block text-sm font-medium">
          Total pages
        </label>
        <input
          id="new-book-pages"
          type="number"
          required
          min="1"
          max="50000"
          step="1"
          inputMode="numeric"
          value={totalPages}
          onChange={handlePagesChange}
          className="mt-1 min-h-11 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="min-h-11 rounded bg-blue-900 px-5 py-2 text-white sm:shrink-0"
      >
        Add book
      </button>
    </form>
  )
}

export default TodoCreate