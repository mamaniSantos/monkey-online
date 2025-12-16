import React, { useState } from 'react'

const LoginModal = ({ isOpen, onClose, onLogin, isAdminLogin = false }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

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
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Por favor ingresa tu nombre'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Por favor ingresa tu email'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Por favor ingresa tu contraseña'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    
    if (Object.keys(validationErrors).length === 0) {
      if (isLogin) {
        // Para login normal
        if (!isAdminLogin) {
          const users = JSON.parse(localStorage.getItem('users') || '[]')
          const user = users.find(u => u.email === formData.email && u.password === formData.password)
          
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify({
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin || false
            }))
            onLogin({ name: user.name, email: user.email, isAdmin: user.isAdmin || false })
            onClose()
            resetForm()
          } else {
            setErrors({ general: 'Email o contraseña incorrectos' })
          }
        }
      } else {
        // Lógica de registro
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        
        if (users.some(u => u.email === formData.email)) {
          setErrors({ email: 'Este email ya está registrado' })
          return
        }
        
        const newUser = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          isAdmin: false
        }
        
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        
        // Auto login después del registro
        localStorage.setItem('currentUser', JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          isAdmin: false
        }))
        
        onLogin({ name: newUser.name, email: newUser.email, isAdmin: false })
        onClose()
        resetForm()
      }
    } else {
      setErrors(validationErrors)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setErrors({})
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    resetForm()
  }

  if (!isOpen) return null

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header" style={{ 
            backgroundColor: isAdminLogin ? '#dc3545' : '#0d6efd',
            color: 'white'
          }}>
            <h5 className="modal-title">
              <i className={`fas ${isAdminLogin ? 'fa-user-shield' : 'fa-user'} me-2`}></i>
              {isAdminLogin ? 'Admin Login' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {isAdminLogin && (
              <div className="alert alert-warning mb-3">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Acceso solo para administradores autorizados
              </div>
            )}
            
            {errors.general && (
              <div className="alert alert-danger" role="alert">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {!isLogin && !isAdminLogin && (
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
              )}
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              
              {!isLogin && !isAdminLogin && (
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>
              )}
              
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </button>
                
                {!isAdminLogin && (
                  <button type="button" className="btn btn-link" onClick={toggleMode}>
                    {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal