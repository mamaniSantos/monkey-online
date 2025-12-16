import React from 'react'

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('productos')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="hero-section" id="home">
      <div className="container text-center py-5">
        <h1 className="display-4 fw-bold mb-3">Monkey Online</h1>
        <p className="lead">Ropa de bebés de la mejor calidad</p>
        <button className="btn btn-primary btn-lg mt-3" onClick={scrollToProducts}>
          Ver productos
        </button>
      </div>
    </header>
  )
}

export default Hero