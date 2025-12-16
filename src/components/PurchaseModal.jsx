import React from 'react'

const PurchaseModal = ({ isOpen, onClose, orderNumber }) => {
  if (!isOpen) return null

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">¡Compra exitosa!</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body text-center">
            <i className="fas fa-check-circle text-success mb-3" style={{ fontSize: '3rem' }}></i>
            <h4 className="mb-3">Su compra ha sido realizada con éxito</h4>
            <p>Recibirá un correo electrónico con los detalles de su pedido.</p>
            <p className="text-muted">Número de orden: #{orderNumber}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
            <button type="button" className="btn btn-primary" onClick={() => window.print()}>
              <i className="fas fa-print me-2"></i>Imprimir comprobante
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseModal