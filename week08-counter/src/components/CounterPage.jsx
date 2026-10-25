import {useReducer} from 'react'

// Action types as constants. A misspelled STRING fails silently; a misspelled
// VARIABLE NAME throws an error that points at the line. ALL_CAPS is the
// convention -- it tells another developer "this is an action type".
const INCREMENT_COUNT = 'increment-count'
const DECREMENT_COUNT = 'decrement-count'
const SET_VALUE_TO_ADD = 'set-value-to-add'
const ADD_VALUE_TO_COUNT = 'add-value-to-count'

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      }
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1,
      }
    case SET_VALUE_TO_ADD:
      return {
        ...state,
        valueToAdd: action.payload,
      }
    case ADD_VALUE_TO_COUNT:
      return {
        ...state,
        count: state.count + state.valueToAdd,
        valueToAdd: 0,
      }
    default:
      return state
  }
}

const CounterPage = (props) => {
  const {initialCount} = props

  const [state, dispatch] = useReducer(reducer, {
    count: initialCount,
    valueToAdd: 0,
  })

  const increment = () => {
    dispatch({
      type: INCREMENT_COUNT,
    })
  }

  const decrement = () => {
    dispatch({
      type: DECREMENT_COUNT,
    })
  }

  const handleChange = (event) => {
    const value = parseInt(event.target.value) || 0
    dispatch({
      type: SET_VALUE_TO_ADD,
      payload: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch({
      type: ADD_VALUE_TO_COUNT,
    })
  }

  return (
    <div>
      <p className="text-5xl font-bold tabular-nums mb-4">{state.count}</p>

      <div className="flex gap-2">
        <button
          onClick={increment}
          className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
        >
          +1
        </button>
        <button
          onClick={decrement}
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          -1
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex items-end gap-2">
        <div>
          <label className="block text-sm text-gray-600" htmlFor="add">
            Add a number
          </label>
          <input
            id="add"
            type="number"
            value={state.valueToAdd || ''}
            onChange={handleChange}
            className="mt-1 w-24 rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <button className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-700">
          Add it
        </button>
      </form>
    </div>
  )
}

export default CounterPage