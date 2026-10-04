import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

const Modal = ({ onClose, title, children, actionBar, crazy = false }) => {
    useEffect(() => {
        document.body.classList.add('modal-open')

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose()
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            document.body.classList.remove('modal-open')
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    const overlayClass = cx('modalOverlay', {
        modalOverlayCrazy: crazy
    })
    const dialogClass = cx('modalDialog', {
        modalDialogCrazy: crazy
    })

    return createPortal(
        <>
            <div className={overlayClass} onClick={onClose} aria-hidden="true" />
            <section
                className={dialogClass}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {title && <h2 id="modal-title" className="modalTitle">{title}</h2>}
                <div className="modalContent">{children}</div>
                {actionBar && <div className="modalActionBar">{actionBar}</div>}
            </section>
        </>,
        document.getElementById('portal')
    )
}

export default Modal
