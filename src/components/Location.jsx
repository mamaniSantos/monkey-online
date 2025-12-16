import React from 'react'

const Location = () => {
  return (
    <section className="mb-5">
      <h2 className="text-center mb-4">Nuestra ubicación</h2>
      <div className="ratio ratio-16x9">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1949.9099178838349!2d-58.255367556698!3d-34.72170930870093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a32e38e45f5777%3A0x6a86dac21334524f!2sQuilmes%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1748274063796!5m2!1ses!2sar"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de Monkey Online"
        ></iframe>
      </div>
    </section>
  )
}

export default Location