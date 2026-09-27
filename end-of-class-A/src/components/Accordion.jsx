import { useState } from 'react'

const Accordion = (props) => {
  const {
    trigger,
    children,
    defaultOpen = true,
    className = '',
    contentClassName = '',
    id = 'accordion-panel'
  } = props

  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggle = () => setIsOpen((open) => !open)

  return (
    <div className={className}>
      {typeof trigger === 'function'
        ? trigger({ isOpen, onToggle: toggle })
        : trigger}

      {isOpen && (
        <div id={id} className={contentClassName}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Accordion
