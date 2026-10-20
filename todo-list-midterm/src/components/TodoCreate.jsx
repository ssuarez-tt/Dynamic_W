import {useState} from 'react'
import useTodosContext from '../../hoooks/use-todos-context'

const TodoCreate = () => {
  const {createTodo} = useTodosContext()
  // the input's text lives here -- this component owns it, because nobody
  // else needs to know what you are halfway through typing
  const [title, setTitle] = useState('')

  const handleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const created = await createTodo(title)
    if (created) {
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="Book title"
        className="flex-1 border border-gray-300 rounded px-3 py-2"
      />
      <button className="rounded bg-blue-900 px-5 py-2 text-white sm:shrink-0">Add</button>
    </form>
  )
}

export default TodoCreate