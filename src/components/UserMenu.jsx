import React, { useState } from 'react'

const UserMenu = ({ user, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false)

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = () => {
    setShowMenu(false)
    onLogout()
  }

  return (
    <div className="position-relative">
      <button 
        className="btn btn-outline-primary d-flex align-items-center"
        onClick={() => setShowMenu(!showMenu)}
      >
        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2" 
          style={{ width: '30px', height: '30px', fontSize: '12px' }}>
          {getInitials(user.name)}
        </div>
        <span className="d-none d-md-inline">{user.name.split(' ')[0]}</span>
      </button>
      
      {showMenu && (
        <>
          <div className="position-fixed top-0 left-0 w-100 h-100" onClick={() => setShowMenu(false)}></div>
          <div className="position-absolute end-0 mt-2 bg-white rounded shadow-lg border" 
            style={{ zIndex: 1000, minWidth: '200px' }}>
            <div className="p-3 border-bottom">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" 
                  style={{ width: '40px', height: '40px', fontSize: '14px' }}>
                  {getInitials(user.name)}
                </div>
                <div>
                  <h6 className="mb-0">{user.name}</h6>
                  <small className="text-muted">{user.email}</small>
                </div>
              </div>
            </div>
            <div className="p-2">
              <button className="btn btn-link text-dark text-decoration-none w-100 text-start p-2">
                <i className="fas fa-user me-2"></i> Mi Perfil
              </button>
              <button className="btn btn-link text-dark text-decoration-none w-100 text-start p-2">
                <i className="fas fa-shopping-bag me-2"></i> Mis Pedidos
              </button>
              <button className="btn btn-link text-dark text-decoration-none w-100 text-start p-2">
                <i className="fas fa-heart me-2"></i> Favoritos
              </button>
              <div className="dropdown-divider my-1"></div>
              <button 
                className="btn btn-link text-danger text-decoration-none w-100 text-start p-2"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UserMenu