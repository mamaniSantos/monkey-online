import React from 'react'
import CartItem from './CartItem'

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout, total }) => {
  const shipping = total > 0 ? 5.00 : 0.00
  const totalWithShipping = total + shipping

  return (
    <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Tu Carrito</h5>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div id="cartItems" className="mb-3">
          {items.length === 0 ? (
            <p className="text-muted text-center py-3">Tu carrito está vacío</p>
          ) : (
            items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
              />
            ))
          )}
        </div>
        <div className="cart-summary border-top pt-3">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Envío:</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between fw-bold fs-5">
            <span>Total:</span>
            <span>${totalWithShipping.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary w-100 mt-3"
            onClick={onCheckout}
            disabled={items.length === 0}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart