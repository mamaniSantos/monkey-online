import React from 'react'

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>)
    }
    
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>)
    }
    
    const remaining = 5 - stars.length
    for (let i = 0; i < remaining; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>)
    }
    
    return stars
  }

  return (
    <div className="col-md-4">
      <div className="card review-card h-100">
        <div className="card-body">
          <div className="review-header d-flex align-items-center mb-3">
            <img src={review.avatar} alt="Usuario" className="review-avatar rounded-circle me-3" />
            <div>
              <h3 className="h5 mb-0">{review.name}</h3>
              <small className="text-muted">{review.role}</small>
            </div>
          </div>
          
          <div className="stars text-warning mb-3">
            {renderStars(review.rating)}
          </div>
          
          <p className="review-content">{review.content}</p>
          <small className="text-muted review-date">{review.date}</small>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard