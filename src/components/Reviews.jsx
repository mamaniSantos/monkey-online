import React from 'react'
import ReviewCard from './ReviewCard'

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'María González',
      role: 'Cliente desde 2022',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 5,
      content: 'Muy buena calidad y lindo algodón 😍 me encantó.',
      date: '15 de Junio, 2023'
    },
    {
      id: 2,
      name: 'Carlos Martínez',
      role: 'Cliente desde 2021',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4.5,
      content: 'El body destaca por su algodón suave y de excelente calidad. La marca es reconocida por su durabilidad, aguantando bien los lavados.',
      date: '2 de Mayo, 2023'
    },
    {
      id: 3,
      name: 'Laura Fernández',
      role: 'Cliente desde 2023',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 4,
      content: 'Esta marca es buenísima. Tiene hermoso algodón y broches metálicos. Aguanta super bien los lavados.',
      date: '22 de Abril, 2023'
    }
  ]

  return (
    <section id="reseña" className="mb-5">
      <div className="container">
        <div className="section-title text-center mb-5">
          <h2>Lo que dicen nuestros clientes</h2>
          <p className="lead">Descubre las experiencias de quienes han confiado en nuestros servicios</p>
        </div>
        
        <div className="row g-4">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews