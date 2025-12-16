import React from 'react'

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 product-card">
        <img src={product.image} className="card-img-top" alt={product.name} />
        <div className="card-body d-flex flex-column">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-text">{product.description}</p>
          <p className="price mt-auto">${product.price.toFixed(2)}</p>
          <button 
            className="btn btn-primary"
            onClick={() => onAddToCart(product)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard