import React from 'react'
import UserMenu from './UserMenu'

const Navbar = ({ cartCount, onCartClick, user, onLoginClick, onLogout, onAdminClick }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="img/monkey.png" alt="Logo de la empresa" height="60" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('home')}>
                Inicio
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('productos')}>
                Productos
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('reseña')}>
                Reseñas
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => scrollToSection('contacto')}>
                Contacto
              </button>
            </li>
            {user?.isAdmin && (
              <li className="nav-item">
                <button className="nav-link btn btn-link text-danger" onClick={onAdminClick}>
                  <i className="fas fa-cog me-1"></i>
                  Admin
                </button>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center gap-3">
            {user ? (
              <UserMenu user={user} onLogout={onLogout} />
            ) : (
              <button className="btn btn-outline-primary" onClick={onLoginClick}>
                <i className="fas fa-user me-2"></i> Iniciar Sesión
              </button>
            )}
            <button className="btn btn-outline-dark position-relative" onClick={onCartClick}>
              <i className="fas fa-shopping-cart"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar