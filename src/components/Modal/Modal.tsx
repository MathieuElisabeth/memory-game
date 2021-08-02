import React from 'react'
import './Modal.css'

const Modal = (props: { text: string; restart: () => void }) => {
  return (
    <>
      <div className="ModalContainer">
        <div className="Modal-text">
          {props.text}
        </div>
        <div className="Btn-Container">
          <button
            className="Btn-Restart"
            onClick={() => props.restart()}>
            Restart
          </button>
        </div>
      </div>
      <div className="Modal-bg"></div>
    </>
  )
}

export default Modal
