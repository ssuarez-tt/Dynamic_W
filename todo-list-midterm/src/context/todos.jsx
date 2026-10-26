import {useEffect, useMemo, useReducer, useState} from 'react'
import TodosContext from './todos-context'
import {
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  fetchTodos as fetchTodosRequest,
  toggleTodo as toggleTodoRequest,
  updateCurrentPage as updateCurrentPageRequest,
  updateTodo as updateTodoRequest,
} from '../api'

const todosReducer = (todos, action) => {
  switch (action.type) {
    case 'set':
      return action.todos
    case 'add':
      return [...todos, action.todo]
    case 'remove':
      return todos.filter((todo) => todo.id !== action.id)
    case 'replace':
      return todos.map((todo) => todo.id === action.todo.id ? action.todo : todo)
    default:
      return todos
  }
}

export const Provider = ({children}) => {
  const [todos, dispatch] = useReducer(todosReducer, [])
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await fetchTodosRequest()
        dispatch({type: 'set', todos: loadedTodos.map((todo) => ({
          ...todo,
          done: Boolean(todo.done),
          currentPage: todo.currentPage ?? 0,
          totalPages: todo.totalPages ?? 0,
          note: todo.note ?? '',
        }))})
      } catch (requestError) {
        console.error(requestError)
        setError(`Could not load todos: ${requestError.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    loadTodos()
  }, [])

  const createTodo = async (title, totalPages) => {
    try {
      const newTodo = await createTodoRequest(title, totalPages)
      dispatch({
        type: 'add',
        todo: {
          ...newTodo,
          done: Boolean(newTodo.done),
          currentPage: newTodo.currentPage ?? 0,
          totalPages: newTodo.totalPages ?? totalPages,
          note: newTodo.note ?? '',
        },
      })
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
      dispatch({type: 'remove', id})
      setError('')
    } catch (requestError) {
      console.error(requestError)
      setError(`Could not delete todo: ${requestError.message}`)
    }
  }

  const editTodo = async (id, changes) => {
    const todo = todos.find((item) => item.id === id)
    if (!todo) {
      setError('Could not update todo: item was not found.')
      return false
    }

    const updatedFields = {
      ...todo,
      ...changes,
    }
    if (
      !Number.isSafeInteger(updatedFields.totalPages) ||
      updatedFields.totalPages < 1 ||
      updatedFields.currentPage > updatedFields.totalPages
    ) {
      setError('Total pages must be a positive whole number and cannot be below the current page.')
      return false
    }

    try {
      const updatedTodo = await updateTodoRequest(updatedFields)
      dispatch({
        type: 'replace',
        todo: {...updatedFields, ...updatedTodo, note: updatedTodo.note ?? updatedFields.note ?? ''},
      })
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
      dispatch({type: 'replace', todo: updatedTodo})
      setError('')
    } catch (requestError) {
      console.error(requestError)
      setError(`Could not update todo: ${requestError.message}`)
    }
  }

  const saveCurrentPage = async (id, currentPage) => {
    const todo = todos.find((item) => item.id === id)
    if (!todo) {
      setError('Could not save current page: book was not found.')
      return false
    }

    if (!Number.isSafeInteger(currentPage) || currentPage < 0) {
      setError('Current page must be a non-negative whole number.')
      return false
    }
    if (currentPage > todo.totalPages) {
      setError('Current page cannot be greater than the total number of pages.')
      return false
    }

    try {
      const updatedTodo = await updateCurrentPageRequest(id, currentPage)
      dispatch({
        type: 'replace',
        todo: {...todo, ...updatedTodo},
      })
      setError('')
      return true
    } catch (requestError) {
      console.error(requestError)
      setError(`Could not save current page: ${requestError.message}`)
      return false
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
    saveCurrentPage,
  }

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
}
