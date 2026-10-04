import { useState } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'

const LIPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium, nisl sed iaculis dignissim, tellus odio fermentum nisl, vel mollis risus ipsum eget urna. Fusce et aliquam dui, sed interdum quam. Etiam a luctus purus. Aliquam ultricies tellus a pellentesque dapibus. Praesent sit amet tincidunt orci. Morbi porttitor semper neque, eu sodales lorem scelerisque vitae. Proin vulputate, enim a semper gravida, mauris metus interdum tortor, sit amet accumsan enim tellus eu urna.'

const ModalPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const actionBar = (
    <>
      <Button className="modalPromptButton" onClick={() => console.log('Prompt selected')}>
        Some Prompt
      </Button>
      <Button className="modalCloseButton" onClick={handleClose}>
        Close
      </Button>
    </>
  )

  return (
    <main className="modalPage">
      <h1>Modal example</h1>
      {[...Array(4)].map((_, index) => (
        <p key={index} className="modalPageParagraph">{LIPSUM}</p>
      ))}
      <Button className="modalOpenButton" onClick={handleOpen}>Open Modal</Button>

      {isOpen && (
        <Modal onClose={handleClose} title="Yay Modals!" actionBar={actionBar} crazy>
          <p>This is modal content populated by the children prop!</p>
          <p>{LIPSUM}</p>
        </Modal>
      )}
    </main>
  )
}

export default ModalPage
