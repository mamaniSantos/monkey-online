import React from 'react'

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h3 className="h5 mb-3">Monkey Online</h3>
            <p>Ropa de bebés de la mejor calidad para tus pequeños.</p>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <h3 className="h5 mb-3">Enlaces rápidos</h3>
            <ul className="list-unstyled">
              <li className="mb-2">
                <button 
                  className="text-white text-decoration-none btn btn-link p-0"
                  onClick={() => scrollToSection('home')}
                >
                  Inicio
                </button>
              </li>
              <li className="mb-2">
                <button 
                  className="text-white text-decoration-none btn btn-link p-0"
                  onClick={() => scrollToSection('productos')}
                >
                  Productos
                </button>
              </li>
              <li className="mb-2">
                <button 
                  className="text-white text-decoration-none btn btn-link p-0"
                  onClick={() => scrollToSection('reseña')}
                >
                  Reseñas
                </button>
              </li>
              <li>
                <button 
                  className="text-white text-decoration-none btn btn-link p-0"
                  onClick={() => scrollToSection('contacto')}
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3 className="h5 mb-3">Contacto</h3>
            <p><i className="fas fa-map-marker-alt me-2"></i> Quilmes, Buenos Aires</p>
            <p><i className="fas fa-envelope me-2"></i> info@monkeyonline.com</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p className="mb-0">Derechos reservados &copy; 2025 Monkey Web</p>
          <p className="mb-0">
            <a href="#" className="text-white text-decoration-none me-3">
              Política de privacidad
            </a>
            |
            <a href="#" className="text-white text-decoration-none ms-3">
              Términos de uso
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer