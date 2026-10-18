import useTodosContext from '../../hoooks/use-todos-context'
import TodoItem from './TodoItem'

const TodoList = () => {
  const {visibleTodos} = useTodosContext()

  const renderedTodos = visibleTodos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} />
  ))

  return <div>{renderedTodos}</div>
}

export default TodoList
