import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const fetchTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`)
  return response.data
}

export const createTodo = async (title, totalPages) => {
  const response = await axios.post(`${BASE_URL}/todos`, {
    title,
    done: false,
    currentPage: 0,
    totalPages,
    note: '',
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

export const translateNote = async (note, targetLanguage) => {
  const response = await fetch('http://localhost:3002/api/translate', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text: note, targetLanguage}),
  })

  let result
  try {
    result = await response.json()
  } catch {
    throw new Error(`Translation server returned an unreadable response (HTTP ${response.status}).`)
  }

  if (!result || typeof result !== 'object') {
    throw new Error('Translation server returned an invalid response.')
  }

  if (!response.ok) {
    const detail = typeof result.error === 'string'
      ? result.error
      : typeof result.message === 'string'
        ? result.message
        : ''
    throw new Error(detail || `Translation request failed with HTTP ${response.status}.`)
  }

  if (typeof result.translatedText !== 'string') {
    throw new Error('Translation server response did not include translated text.')
  }

  return {
    translatedText: result.translatedText,
    targetLanguage: result.targetLanguage,
    alternatives: Array.isArray(result.alternatives)
      ? result.alternatives.filter((alternative) => typeof alternative === 'string')
      : [],
  }
}