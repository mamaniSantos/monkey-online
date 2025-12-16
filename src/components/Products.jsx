import React from 'react'
import ProductCard from './ProductCard'

const Products = ({ products, addToCart, isAdmin, onEditProduct }) => {
  const handleAdminEdit = (product) => {
    if (isAdmin) {
      onEditProduct(product)
    }
  }

  return (
    <section id="productos" className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="mb-0">NUESTROS PRODUCTOS</h2>
        {isAdmin && (
          <div className="badge bg-danger">
            <i className="fas fa-user-shield me-1"></i>
            Modo Administrador
          </div>
        )}
      </div>
      <div className="row g-4">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart}
            isAdmin={isAdmin}
            onEdit={handleAdminEdit}
          />
        ))}
      </div>
      {isAdmin && (
        <div className="alert alert-info mt-4">
          <div className="d-flex align-items-center">
            <i className="fas fa-info-circle me-3 fa-2x"></i>
            <div>
              <h6 className="alert-heading mb-1">Modo Administrador Activado</h6>
              <p className="mb-0">
                Haz clic en el icono <i className="fas fa-edit text-primary"></i> en cualquier producto para editarlo.
                Para agregar nuevos productos o ver todos, usa el botón "Admin" en la barra de navegación.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Products