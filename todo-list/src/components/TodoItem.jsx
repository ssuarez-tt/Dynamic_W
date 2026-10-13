import {useState} from 'react'
import TodoEdit from './TodoEdit'

const TodoItem = (props) => {
  const {todo, onDelete, onEdit, onToggle} = props
  // THIS one belongs here. Whether this row is showing its edit form is
  // nobody else's business -- App does not care, the other rows do not care.
  const [showEdit, setShowEdit] = useState(false)

  const handleDelete = () => {
    onDelete(todo.id)
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleSubmit = async (id, newTitle) => {
    const updated = await onEdit(id, newTitle)
    if (updated) {
      setShowEdit(false)
    }
  }

  if (showEdit) {
    return <TodoEdit todo={todo} onSubmit={handleSubmit} />
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <input
          type="checkbox"
          checked={Boolean(todo.done)}
          onChange={(event) => onToggle(todo.id, event.target.checked)}
          aria-label={`Mark ${todo.title} as ${todo.done ? 'active' : 'done'}`}
        />
        <span className={todo.done ? 'line-through text-gray-500' : ''}>
          {todo.title}
        </span>
      </div>
      <div className="flex gap-3 text-sm">
        <button onClick={handleEditClick} className="text-blue-700">
          edit
        </button>
        <button onClick={handleDelete} className="text-red-600">
          delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem