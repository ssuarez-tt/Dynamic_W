import {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  fetchTodos as fetchTodosRequest,
  toggleTodo as toggleTodoRequest,
  updateTodo as updateTodoRequest,
} from '../api'

export const TodosContext = createContext(null)

export const Provider = ({children}) => {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await fetchTodosRequest()
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

  const deleteTodo = async (id) => {
    try {
      await deleteTodoRequest(id)
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
      setError('')
    } catch (requestError) {
      console.error(requestError)
      setError(`Could not delete todo: ${requestError.message}`)
    }
  }

  const editTodo = async (id, title) => {
    const todo = todos.find((item) => item.id === id)
    if (!todo) {
      setError('Could not update todo: item was not found.')
      return false
    }

    try {
      const updatedTodo = await updateTodoRequest({...todo, title})
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

  const toggleTodo = async (id, done) => {
    try {
      const updatedTodo = await toggleTodoRequest(id, done)
      setTodos((currentTodos) =>
        currentTodos.map((item) => item.id === id ? updatedTodo : item)
      )
      setError('')
    } catch (requestError) {
      console.error(requestError)
      setError(`Could not update todo: ${requestError.message}`)
    }
  }

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.done)
    }
    if (filter === 'done') {
      return todos.filter((todo) => todo.done)
    }
    return todos
  }, [filter, todos])

  const value = {
    todos,
    visibleTodos,
    filter,
    setFilter,
    isLoading,
    error,
    createTodo,
    deleteTodo,
    editTodo,
    toggleTodo,
  }

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
}
