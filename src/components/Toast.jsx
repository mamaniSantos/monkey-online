import React, { useEffect } from 'react'

const Toast = ({ type, title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
      <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div className={`toast-header ${type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`}>
          <strong className="me-auto">{title}</strong>
          <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </div>
  )
}

export default Toast