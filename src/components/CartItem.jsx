import React from 'react'

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="cart-item d-flex align-items-center mb-3 pb-3 border-bottom">
      <img src={item.image} alt={item.name} className="rounded me-3" width="60" />
      <div className="flex-grow-1">
        <h6 className="mb-1">{item.name}</h6>
        <div className="d-flex justify-content-between align-items-center">
          <div className="input-group input-group-sm" style={{ width: '100px' }}>
            <button
              className="btn btn-outline-secondary"
              onClick={() => onUpdateQuantity(item.id, -1)}
            >
              -
            </button>
            <input
              type="text"
              className="form-control text-center"
              value={item.quantity}
              readOnly
            />
            <button
              className="btn btn-outline-secondary"
              onClick={() => onUpdateQuantity(item.id, 1)}
            >
              +
            </button>
          </div>
          <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
      <button
        className="btn btn-sm btn-outline-danger ms-2"
        onClick={() => onRemoveItem(item.id)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  )
}

export default CartItem