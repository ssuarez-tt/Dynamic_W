import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const pageOptions = [
  { value: '/', label: 'Connected recipes' },
  { value: '/button', label: 'Button recipe' },
  { value: '/accordion', label: 'Accordion recipe' },
  { value: '/panel', label: 'Panel' }
]

const DropdownPage = () => {
  const navigate = useNavigate()
  const [selectedPage, setSelectedPage] = useState('')

  const handleChange = ({ target }) => {
    setSelectedPage(target.value)
    navigate(target.value)
  }

  return (
    <main className="dropdownPage">
      <h1>Recipe pages</h1>
      <label htmlFor="recipe-page-select">Choose a page</label>
      <select
        id="recipe-page-select"
        value={selectedPage}
        onChange={handleChange}
      >
        <option value="" disabled>Select a page</option>
        {pageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </main>
  )
}

export default DropdownPage
