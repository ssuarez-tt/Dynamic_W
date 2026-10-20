import {useEffect, useState} from 'react'
import TodoEdit from './TodoEdit'
import useTodosContext from '../../hoooks/use-todos-context'

const TodoItem = ({todo}) => {
  const {deleteTodo, editTodo, toggleTodo, saveCurrentPage} = useTodosContext()
  // THIS one belongs here. Whether this row is showing its edit form is
  // nobody else's business -- App does not care, the other rows do not care.
  const [showEdit, setShowEdit] = useState(false)
  const [pageInput, setPageInput] = useState(String(todo.currentPage ?? 0))
  const [pageError, setPageError] = useState('')

  useEffect(() => {
    setPageInput(String(todo.currentPage ?? 0))
  }, [todo.currentPage])

  const handleDelete = () => {
    deleteTodo(todo.id)
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = async (id, newTitle) => {
    const updated = await editTodo(id, newTitle)
    if (updated) {
      setShowEdit(false)
    }
  }

  const handlePageSubmit = async (event) => {
    event.preventDefault()
    const currentPage = Number(pageInput)
    if (pageInput.trim() === '' || !Number.isSafeInteger(currentPage) || currentPage < 0) {
      setPageError('Enter a page number of 0 or greater.')
      return
    }

    const saved = await saveCurrentPage(todo.id, currentPage)
    setPageError(saved ? '' : 'Page could not be saved.')
  }

  if (showEdit) {
    return <TodoEdit todo={todo} onSubmit={handleSubmit} />
  }

  return (
    <div className="flex flex-col gap-3 border-b border-gray-200 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <input
          type="checkbox"
          checked={Boolean(todo.done)}
          onChange={(event) => toggleTodo(todo.id, event.target.checked)}
          aria-label={`Mark ${todo.title} as ${todo.done ? 'active' : 'done'}`}
        />
        <span className={todo.done ? 'line-through text-gray-500' : ''}>
          {todo.title}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <form onSubmit={handlePageSubmit} className="flex items-center gap-2">
          <label htmlFor={`page-${todo.id}`} className="text-gray-600">Page</label>
          <input
            id={`page-${todo.id}`}
            type="number"
            min="0"
            step="1"
            inputMode="numeric"
            value={pageInput}
            onChange={(event) => setPageInput(event.target.value)}
            className="w-20 rounded border border-gray-300 px-2 py-1"
          />
          <button type="submit" className="rounded bg-slate-100 px-3 py-2 text-slate-800">
            Save
          </button>
        </form>
        {pageError && <span role="alert" className="text-red-700">{pageError}</span>}
        <button type="button" onClick={handleEditClick} className="py-2 text-blue-700">
          edit
        </button>
        <button type="button" onClick={handleDelete} className="py-2 text-red-600">
          delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem