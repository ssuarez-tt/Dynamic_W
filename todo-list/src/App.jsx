// 1. The initial GET effect uses [] because the server data is needed when this
//    component mounts, not after every render. Putting the GET in the component
//    body would repeat it on every state update. StrictMode can replay effects
//    in development to help detect unsafe side effects.
// 2. the row would disappear temporarily even though it was not deleted; after
//    refresh, the server would send it again.
// 3. The filter needs no request: all todos are already in state, so filter()
//    derives the visible subset locally without changing server data.
import {useEffect, useState} from 'react'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import {
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  fetchTodos,
  updateTodo as updateTodoRequest,
} from './api'

const App = () => {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await fetchTodos()
        setTodos(loadedTodos.map((todo) => ({...todo, done: Boolean(todo.done)})))
      } catch (requestError) {
        console.error(requestError)
        setError(`Could not load todos: ${requestError.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    loadTodos()
  }, [])

  const createTodo = async (title) => {
    try {
      const newTodo = await createTodoRequest(title)
      setTodos((currentTodos) => [
        ...currentTodos,
        {...newTodo, done: Boolean(newTodo.done)},
      ])
      setError('')
      return true
    } catch (requestError) {
      console.error(requestError)
      setError(`Could not create todo: ${requestError.message}`)
      return false
    }
  }

  const deleteTodoById = async (id) => {
    try {
      await deleteTodoRequest(id)
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
      setError('')
    } catch (requestError) {
      console.error(requestError)
      setError(`Could not delete todo: ${requestError.message}`)
    }
  }

  const updateTodoById = async (id, changes) => {
    const todo = todos.find((item) => item.id === id)
    if (!todo) {
      setError('Could not update todo: item was not found.')
      return false
    }

    try {
      const updatedTodo = await updateTodoRequest({...todo, ...changes})
      setTodos((currentTodos) =>
        currentTodos.map((item) => item.id === id ? updatedTodo : item)
      )
      setError('')
      return true
    } catch (requestError) {
      console.error(requestError)
      setError(`Could not update todo: ${requestError.message}`)
      return false
    }
  }

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.done
    }
    if (filter === 'done') {
      return todo.done
    }
    return true
  })

  const filters = [
    {value: 'all', label: 'All'},
    {value: 'active', label: 'Active'},
    {value: 'done', label: 'Done'},
  ]

  const renderFilterButtons = filters.map(({value, label}) => (
    <button
      key={value}
      type="button"
      onClick={() => setFilter(value)}
      aria-pressed={filter === value}
      className={`rounded px-3 py-1 text-sm ${
        filter === value ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700'
      }`}
    >
      {label}
    </button>
  ))

  const toggleTodoDone = (id, done) => updateTodoById(id, {done})
  const editTodoById = (id, title) => updateTodoById(id, {title})

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <TodoCreate onCreate={createTodo} />
      <div className="mb-3 flex gap-2" role="group" aria-label="Filter todos">
        {renderFilterButtons}
      </div>
      {error && (
        <p role="alert" className="mb-3 rounded bg-red-50 p-3 text-red-700">
          {error}
        </p>
      )}
      {isLoading ? (
        <p className="text-gray-500">Loading todos...</p>
      ) : (
        <TodoList
          todos={visibleTodos}
          onDelete={deleteTodoById}
          onEdit={editTodoById}
          onToggle={toggleTodoDone}
        />
      )}
    </div>
  )
}

export default App