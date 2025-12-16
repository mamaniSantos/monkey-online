// Funciones de utilidad para administración

export const validateProduct = (product) => {
  const errors = []
  
  if (!product.name?.trim()) {
    errors.push('El nombre es requerido')
  }
  
  if (!product.description?.trim()) {
    errors.push('La descripción es requerida')
  }
  
  if (!product.price || isNaN(product.price) || product.price <= 0) {
    errors.push('El precio debe ser un número válido mayor a 0')
  }
  
  if (!product.image?.trim()) {
    errors.push('La URL de la imagen es requerida')
  }
  
  return errors
}

export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(price)
}

export const generateProductId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export const getProductStatistics = (products) => {
  const totalValue = products.reduce((sum, product) => sum + product.price, 0)
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))]
  
  return {
    totalProducts: products.length,
    totalValue,
    averagePrice: products.length > 0 ? totalValue / products.length : 0,
    categories: categories.length,
    mostExpensive: products.length > 0 
      ? products.reduce((max, p) => p.price > max.price ? p : max)
      : null,
    leastExpensive: products.length > 0 
      ? products.reduce((min, p) => p.price < min.price ? p : min)
      : null
  }
}

export const exportProductsToCSV = (products) => {
  const headers = ['ID', 'Nombre', 'Descripción', 'Precio', 'Categoría', 'Imagen']
  const rows = products.map(product => [
    product.id,
    `"${product.name.replace(/"/g, '""')}"`,
    `"${product.description.replace(/"/g, '""')}"`,
    product.price,
    product.category || '',
    product.image
  ])
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `productos_monkey_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const importProductsFromCSV = (csvText) => {
  const lines = csvText.split('\n')
  const headers = lines[0].split(',').map(h => h.trim())
  
  const products = lines.slice(1)
    .filter(line => line.trim())
    .map(line => {
      const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
      const product = {}
      
      headers.forEach((header, index) => {
        if (header === 'Precio') {
          product.price = parseFloat(values[index])
        } else if (header === 'ID') {
          product.id = values[index]
        } else {
          product[header.toLowerCase()] = values[index]
        }
      })
      
      return product
    })
  
  return products
}