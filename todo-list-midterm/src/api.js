import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const fetchTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`)
  return response.data
}

export const createTodo = async (title) => {
  const response = await axios.post(`${BASE_URL}/todos`, {
    title,
    done: false,
    currentPage: 0,
  })
  return response.data
}

export const deleteTodo = async (id) => {
  await axios.delete(`${BASE_URL}/todos/${id}`)
}

export const updateTodo = async (todo) => {
  const response = await axios.put(`${BASE_URL}/todos/${todo.id}`, todo)
  return response.data
}

export const toggleTodo = async (id, done) => {
  const response = await axios.patch(`${BASE_URL}/todos/${id}`, {done})
  return response.data
}

export const updateCurrentPage = async (id, currentPage) => {
  const response = await axios.patch(`${BASE_URL}/todos/${id}`, {currentPage})
  return response.data
}