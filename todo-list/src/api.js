import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const fetchTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`)
  return response.data
}

export const createTodo = async (title) => {
  const response = await axios.post(`${BASE_URL}/todos`, {title, done: false})
  return response.data
}

export const deleteTodo = async (id) => {
  await axios.delete(`${BASE_URL}/todos/${id}`)
}

export const updateTodo = async (todo) => {
  const response = await axios.put(`${BASE_URL}/todos/${todo.id}`, todo)
  return response.data
}
