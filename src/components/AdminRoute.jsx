import React from 'react'
import LoginModal from './LoginModal'

const AdminRoute = ({ children, adminCredentials }) => {
  const [showLogin, setShowLogin] = React.useState(false)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  const handleAdminLogin = (email, password) => {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      setIsAuthenticated(true)
      localStorage.setItem('adminLoggedIn', 'true')
      setShowLogin(false)
      return true
    }
    return false
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminLoggedIn')
  }

  React.useEffect(() => {
    const savedLogin = localStorage.getItem('adminLoggedIn')
    if (savedLogin === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) {
    return (
      <>
        <div className="text-center py-5">
          <i className="fas fa-lock fa-3x text-muted mb-3"></i>
          <h4 className="mb-3">Acceso Restringido</h4>
          <p className="text-muted mb-4">Esta área requiere permisos de administrador</p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowLogin(true)}
          >
            <i className="fas fa-sign-in-alt me-2"></i>
            Iniciar Sesión como Administrador
          </button>
        </div>
        
        {showLogin && (
          <LoginModal
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onLogin={(credentials) => {
              const success = handleAdminLogin(credentials.email, credentials.password)
              if (!success) {
                alert('Credenciales de administrador incorrectas')
              }
            }}
            isAdminLogin={true}
          />
        )}
      </>
    )
  }

  return React.cloneElement(children, { onLogout: handleLogout })
}

export default AdminRoute