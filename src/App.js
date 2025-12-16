import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Location from './components/Location'
import Footer from './components/Footer'
import Cart from './components/Cart'
import PurchaseModal from './components/PurchaseModal'
import LoginModal from './components/LoginModal'
import AdminPanel from './components/AdminPanel'
import Toast from './components/Toast'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Body de Algodón',
      description: 'Body de algodón 100% para bebé, suave y cómodo',
      price: 20.00,
      image: 'img/E.JPG',
      category: 'ropa'
    },
    {
      id: 2,
      name: 'Conjunto de Invierno',
      description: 'Conjunto completo para el frío con gorro incluido',
      price: 25.00,
      image: 'img/B.jpg',
      category: 'ropa'
    },
    {
      id: 3,
      name: 'Vestido Elegante',
      description: 'Vestido elegante para ocasiones especiales',
      price: 30.00,
      image: 'img/C.jpg',
      category: 'ropa'
    },
    {
      id: 4,
      name: 'Pijama Cálido',
      description: 'Pijama de felpa para las noches frías',
      price: 35.00,
      image: 'img/DD.JPG',
      category: 'ropa'
    }
  ])
  const [showCart, setShowCart] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [toast, setToast] = useState(null)
  const [user, setUser] = useState(null)

  // Cargar datos iniciales
  useEffect(() => {
    // Cargar usuario
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      
      // Verificar si es admin por primera vez
      if (userData.email === 'admin@monkey.com' && !userData.isAdmin) {
        userData.isAdmin = true
        setUser(userData)
        localStorage.setItem('currentUser', JSON.stringify(userData))
      }
    }
    
    // Inicializar usuarios en localStorage si no existen
    if (!localStorage.getItem('users')) {
      const defaultUsers = [
        {
          name: 'Administrador',
          email: 'admin@monkey.com',
          password: 'admin123',
          isAdmin: true
        },
        {
          name: 'Usuario Demo',
          email: 'demo@example.com',
          password: '123456',
          isAdmin: false
        }
      ]
      localStorage.setItem('users', JSON.stringify(defaultUsers))
    }
    
    // Cargar productos de admin si existen
    const adminProducts = localStorage.getItem('adminProducts')
    if (adminProducts) {
      try {
        const parsedProducts = JSON.parse(adminProducts)
        if (parsedProducts.length > 0) {
          setProducts(parsedProducts)
        }
      } catch (error) {
        console.error('Error loading admin products:', error)
      }
    }
  }, [])

  // Funciones del carrito
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
    
    showToast({
      type: 'success',
      title: 'Producto agregado',
      message: `${product.name} se ha añadido al carrito`
    })
  }

  const updateQuantity = (id, delta) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const handleCheckout = () => {
    if (!user) {
      showToast({
        type: 'warning',
        title: 'Inicia sesión',
        message: 'Debes iniciar sesión para finalizar la compra'
      })
      setShowLoginModal(true)
      return
    }
    
    setShowPurchaseModal(true)
    clearCart()
    setShowCart(false)
  }

  // Funciones de autenticación
  const handleLogin = (userData) => {
    setUser(userData)
    setShowLoginModal(false)
    showToast({
      type: 'success',
      title: '¡Bienvenido!',
      message: `Hola ${userData.name}, has iniciado sesión correctamente`
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setUser(null)
    showToast({
      type: 'info',
      title: 'Sesión cerrada',
      message: 'Has cerrado sesión correctamente'
    })
  }

  // Funciones de administración
  const handleAddProduct = (newProduct) => {
    setProducts(prev => {
      const updatedProducts = [...prev, newProduct]
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts))
      return updatedProducts
    })
    
    showToast({
      type: 'success',
      title: 'Producto agregado',
      message: `${newProduct.name} se ha agregado correctamente`
    })
  }

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev => {
      const updatedProducts = prev.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts))
      return updatedProducts
    })
    
    showToast({
      type: 'success',
      title: 'Producto actualizado',
      message: `${updatedProduct.name} se ha actualizado correctamente`
    })
  }

  const handleDeleteProduct = (productId) => {
    setProducts(prev => {
      const updatedProducts = prev.filter(product => product.id !== productId)
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts))
      return updatedProducts
    })
    
    showToast({
      type: 'warning',
      title: 'Producto eliminado',
      message: 'El producto ha sido eliminado del catálogo'
    })
  }

  // Utilidades
  const showToast = (toastData) => {
    setToast(toastData)
    setTimeout(() => setToast(null), 3000)
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <Navbar 
        cartCount={cartCount}
        onCartClick={() => setShowCart(true)}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        onAdminClick={() => setShowAdminPanel(true)}
      />
      
      <Hero />
      
      <Products 
        products={products}
        addToCart={addToCart}
        isAdmin={user?.isAdmin}
        onEditProduct={(product) => {
          setShowAdminPanel(true)
          // Aquí podrías implementar lógica para pre-seleccionar el producto a editar
        }}
      />
      
      <Reviews />
      
      <Contact />
      
      <Location />
      
      <Footer />
      
      <Cart 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
        total={cartTotal}
      />
      
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        orderNumber={Math.floor(Math.random() * 1000000)}
      />
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
      
      {showAdminPanel && user?.isAdmin && (
        <AdminPanel
          onClose={() => setShowAdminPanel(false)}
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}
      
      {toast && (
        <Toast
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}

export default App