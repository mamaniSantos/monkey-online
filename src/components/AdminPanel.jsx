import React, { useState, useEffect } from 'react'

const AdminPanel = ({ onClose, products, onAddProduct, onUpdateProduct, onDeleteProduct }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  })
  const [editing, setEditing] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Cargar productos de localStorage si no se pasan por props
    const savedProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]')
    if (savedProducts.length > 0) {
      savedProducts.forEach(product => onAddProduct(product))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida'
    }
    
    if (!formData.price) {
      newErrors.price = 'El precio es requerido'
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser un número válido mayor a 0'
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'La URL de la imagen es requerida'
    }
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    
    if (Object.keys(validationErrors).length === 0) {
      const product = {
        ...formData,
        id: editing ? formData.id : Date.now().toString(),
        price: parseFloat(formData.price)
      }
      
      if (editing) {
        onUpdateProduct(product)
      } else {
        onAddProduct(product)
      }
      
      resetForm()
    } else {
      setErrors(validationErrors)
    }
  }

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category || ''
    })
    setEditing(true)
  }

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      image: '',
      category: ''
    })
    setEditing(false)
    setErrors({})
  }

  const handleDelete = (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      onDeleteProduct(productId)
    }
  }

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">
              <i className="fas fa-cogs me-2"></i>
              Panel de Administración
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {/* Formulario */}
              <div className="col-md-5">
                <div className="card mb-4">
                  <div className="card-header bg-light">
                    <h5 className="mb-0">
                      {editing ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Nombre del Producto *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ej: Body de algodón"
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">Descripción *</label>
                        <textarea
                          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="3"
                          placeholder="Describe el producto..."
                        />
                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                      </div>
                      
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Precio ($) *</label>
                          <div className="input-group">
                            <span className="input-group-text">$</span>
                            <input
                              type="number"
                              step="0.01"
                              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                              name="price"
                              value={formData.price}
                              onChange={handleChange}
                              placeholder="0.00"
                            />
                          </div>
                          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Categoría</label>
                          <select
                            className="form-select"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                          >
                            <option value="">Seleccionar categoría</option>
                            <option value="ropa">Ropa</option>
                            <option value="accesorios">Accesorios</option>
                            <option value="juguetes">Juguetes</option>
                            <option value="otros">Otros</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="form-label">URL de la Imagen *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                          name="image"
                          value={formData.image}
                          onChange={handleChange}
                          placeholder="https://ejemplo.com/imagen.jpg"
                        />
                        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                        {formData.image && (
                          <div className="mt-2">
                            <small className="text-muted">Vista previa:</small>
                            <div className="mt-1">
                              <img 
                                src={formData.image} 
                                alt="Vista previa" 
                                className="img-thumbnail"
                                style={{ maxHeight: '100px' }}
                                onError={(e) => e.target.style.display = 'none'}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">
                          {editing ? (
                            <>
                              <i className="fas fa-save me-2"></i>
                              Guardar Cambios
                            </>
                          ) : (
                            <>
                              <i className="fas fa-plus me-2"></i>
                              Agregar Producto
                            </>
                          )}
                        </button>
                        
                        {editing && (
                          <button type="button" className="btn btn-secondary" onClick={resetForm}>
                            <i className="fas fa-times me-2"></i>
                            Cancelar Edición
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                
                <div className="card">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">Estadísticas</h6>
                  </div>
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-6">
                        <div className="display-6 fw-bold text-primary">{products.length}</div>
                        <small className="text-muted">Productos</small>
                      </div>
                      <div className="col-6">
                        <div className="display-6 fw-bold text-success">
                          ${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                        </div>
                        <small className="text-muted">Valor total</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Lista de Productos */}
              <div className="col-md-7">
                <div className="card">
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Productos ({products.length})</h5>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        localStorage.setItem('adminProducts', JSON.stringify(products))
                        alert('Productos guardados en localStorage')
                      }}
                    >
                      <i className="fas fa-save me-1"></i>
                      Guardar
                    </button>
                  </div>
                  <div className="card-body p-0">
                    {products.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
                        <p className="text-muted">No hay productos registrados</p>
                      </div>
                    ) : (
                      <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        <table className="table table-hover mb-0">
                          <thead className="table-light sticky-top">
                            <tr>
                              <th width="80">Imagen</th>
                              <th>Producto</th>
                              <th>Precio</th>
                              <th width="120">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map(product => (
                              <tr key={product.id}>
                                <td>
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="rounded"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                    onError={(e) => {
                                      e.target.onerror = null
                                      e.target.src = 'https://via.placeholder.com/60x60?text=No+Image'
                                    }}
                                  />
                                </td>
                                <td>
                                  <div>
                                    <strong>{product.name}</strong>
                                    <small className="d-block text-muted" style={{ fontSize: '0.85em' }}>
                                      {product.description.length > 50 
                                        ? `${product.description.substring(0, 50)}...` 
                                        : product.description}
                                    </small>
                                    {product.category && (
                                      <span className="badge bg-secondary mt-1">{product.category}</span>
                                    )}
                                  </div>
                                </td>
                                <td className="fw-bold">${product.price.toFixed(2)}</td>
                                <td>
                                  <div className="btn-group btn-group-sm">
                                    <button 
                                      className="btn btn-outline-primary"
                                      onClick={() => handleEdit(product)}
                                      title="Editar"
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    <button 
                                      className="btn btn-outline-danger"
                                      onClick={() => handleDelete(product.id)}
                                      title="Eliminar"
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="alert alert-info mt-3">
                  <div className="d-flex">
                    <div className="me-3">
                      <i className="fas fa-info-circle fa-2x"></i>
                    </div>
                    <div>
                      <h6 className="alert-heading mb-1">Instrucciones:</h6>
                      <p className="mb-0">
                        • Para editar un producto, haz clic en el botón <i className="fas fa-edit text-primary"></i><br/>
                        • Para eliminar un producto, haz clic en el botón <i className="fas fa-trash text-danger"></i><br/>
                        • Los cambios se guardan automáticamente
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel