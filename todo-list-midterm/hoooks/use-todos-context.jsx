import {useContext} from 'react'
import TodosContext from '../src/context/todos-context'

const useTodosContext = () => {
  const context = useContext(TodosContext)
  if (context === null) {
    throw new Error('useTodosContext must be used within a Provider')
  }
  return context
}

export default useTodosContext
