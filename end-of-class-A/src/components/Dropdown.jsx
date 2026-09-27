// useEffect form: [isOpen]
// I only need the document listener while the dropdown is open, and the cleanup removes the listener so it does not pile up between opens/closes.
import {useEffect, useRef, useState} from 'react'
import {GoChevronDown} from 'react-icons/go'
import Panel from '../components/Panel'
const Dropdown = (props) => {
  // options is an array of objects each with a label and a value
  const {options, onChange} = props

  // keep track of if the dropdown itself is open or closed
  const [isOpen, setIsOpen] = useState(false)
  const divEl = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event) => {
      if (!divEl.current) return
      if (!divEl.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  // why does this exist here? to wrap the function we passed
  // in as a prop called onChange
  const handleOptionClick = (option) => {
    setIsOpen(false)
    onChange(option)
  }
  const renderedOptions = options.map((opt, index) => (
    <div
      onClick={() => handleOptionClick(opt)}
      key={index}
      className="hover:bg-sky-100 rounded cursor-pointer p-1"
    >
      {opt.label}
    </div>
  ))

  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        onClick={handleClick}
        className="flex justify-between items-center cursor-pointer"
      >
        <GoChevronDown />
      </Panel>
      {isOpen && <Panel className="absolute top-full">{renderedOptions}</Panel>}
    </div>
  )
}
export default Dropdown
