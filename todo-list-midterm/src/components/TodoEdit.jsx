import {useState} from 'react'

const TodoEdit = (props) => {
  const {todo, onSubmit, onCancel} = props
  const [title, setTitle] = useState(todo.title)
  const [totalPages, setTotalPages] = useState(String(todo.totalPages ?? ''))
  const [note, setNote] = useState(todo.note ?? '')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handlePagesChange = (event) => {
    setTotalPages(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const parsedTotalPages = Number(totalPages)
    if (!Number.isSafeInteger(parsedTotalPages) || parsedTotalPages < 1) return
    onSubmit(todo.id, {
      title: title.trim(),
      totalPages: parsedTotalPages,
      note,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 border-b border-gray-200 py-5 sm:grid-cols-[minmax(0,1fr)_10rem] sm:gap-x-5 lg:grid-cols-[minmax(0,2fr)_minmax(10rem,1fr)_auto_auto] lg:gap-x-6"
    >
      <div>
        <label htmlFor={`edit-title-${todo.id}`} className="block text-sm font-medium">
          Book title
        </label>
        <input
          id={`edit-title-${todo.id}`}
          type="text"
          required
          value={title}
          onChange={handleTitleChange}
          className="mt-1 min-h-11 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor={`edit-pages-${todo.id}`} className="block text-sm font-medium">
          Total pages
        </label>
        <input
          id={`edit-pages-${todo.id}`}
          type="number"
          required
          min="1"
          max="50000"
          step="1"
          value={totalPages}
          onChange={handlePagesChange}
          className="mt-1 min-h-11 w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>
      <div className="sm:col-span-2 lg:col-span-1 lg:self-end">
        <button type="button" onClick={onCancel} className="min-h-11 rounded border border-gray-300 px-4 py-2 text-sm">
          Cancel
        </button>
        <button type="submit" className="ml-3 min-h-11 rounded bg-blue-900 px-4 py-2 text-sm text-white">
          Save
        </button>
      </div>
      <div className="sm:col-span-2 lg:col-span-4">
        <label htmlFor={`edit-note-${todo.id}`} className="block text-sm font-medium">
          Note
        </label>
        <textarea
          id={`edit-note-${todo.id}`}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows="4"
          className="mt-1 min-h-24 w-full resize-y rounded border border-gray-300 px-3 py-2"
        />
      </div>
    </form>
  )
}

export default TodoEdit