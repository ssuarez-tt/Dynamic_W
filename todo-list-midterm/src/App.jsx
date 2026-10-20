// Week 6 homework answers:
// 1. The initial GET runs in TodosProvider's useEffect with [] because it is
//    needed on mount, not after every render. In the component body, every
//    state update would trigger another GET.
// 2. deleteTodo in TodosProvider awaits DELETE before changing state. Updating
//    state before await would hide the row even when the server is down; after
//    refresh, the server would return it because it was never deleted.
// 3. Filtering needs no request: the todos already in context state can be
//    filtered locally to derive the rows shown on screen.
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import useTodosContext from '../hoooks/use-todos-context'

const App = () => {
  const {error, filter, isLoading, setFilter} = useTodosContext()

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

  return (
    <div className="mx-auto max-w-xl p-4 sm:p-8">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Reading List</h1>
      <TodoCreate />
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
        <TodoList />
      )}
    </div>
  )
}

export default App