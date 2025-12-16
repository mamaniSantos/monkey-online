                // CARRITO TIENDA 

document.addEventListener('DOMContentLoaded', function() {
            const cart = {
                items: [],
                total: 0,
                
                // Agregar producto al carrito
                addItem: function(product) {
                    const existingItem = this.items.find(item => item.id === product.id);
                    
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        this.items.push({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1
                        });
                    }
                    
                    this.updateCart();
                },
                
                // Actualizar visualización del carrito
                updateCart: function() {
                    const cartItemsEl = document.getElementById('cartItems');
                    const cartCounterEl = document.getElementById('cartCounter');
                    const cartSubtotalEl = document.getElementById('cartSubtotal');
                    const cartTotalEl = document.getElementById('cartTotal');
                    const checkoutBtn = document.getElementById('checkoutBtn');
                    
                    // Calcular totales
                    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    const shipping = this.total > 0 ? 5.00 : 0.00; // Costo de envío fijo
                    const totalWithShipping = this.total + shipping;
                    
                    // Actualizar contador
                    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
                    cartCounterEl.textContent = totalItems;
                    
                    // Actualizar resumen
                    cartSubtotalEl.textContent = `$${this.total.toFixed(2)}`;
                    document.getElementById('cartShipping').textContent = `$${shipping.toFixed(2)}`;
                    cartTotalEl.textContent = `$${totalWithShipping.toFixed(2)}`;
                    
                    // Actualizar lista de items
                    if (this.items.length === 0) {
                        cartItemsEl.innerHTML = '<p class="text-muted text-center py-3">Tu carrito está vacío</p>';
                        checkoutBtn.disabled = true;
                    } else {
                        cartItemsEl.innerHTML = this.items.map(item => `
                            <div class="cart-item d-flex align-items-center mb-3 pb-3 border-bottom">
                                <img src="${item.image}" alt="${item.name}" class="rounded me-3" width="60">
                                <div class="flex-grow-1">
                                    <h6 class="mb-1">${item.name}</h6>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="input-group input-group-sm" style="width: 100px;">
                                            <button class="btn btn-outline-secondary decrease-qty" data-id="${item.id}">-</button>
                                            <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                                            <button class="btn btn-outline-secondary increase-qty" data-id="${item.id}">+</button>
                                        </div>
                                        <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button class="btn btn-sm btn-outline-danger ms-2 remove-item" data-id="${item.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        `).join('');
                        
                        checkoutBtn.disabled = false;
                        
                        // Agregar event listeners a los botones de cantidad
                        document.querySelectorAll('.increase-qty').forEach(button => {
                            button.addEventListener('click', (e) => {
                                const id = e.target.getAttribute('data-id');
                                const item = this.items.find(item => item.id === id);
                                if (item) item.quantity += 1;
                                this.updateCart();
                            });
                        });
                        
                        document.querySelectorAll('.decrease-qty').forEach(button => {
                            button.addEventListener('click', (e) => {
                                const id = e.target.getAttribute('data-id');
                                const item = this.items.find(item => item.id === id);
                                if (item && item.quantity > 1) {
                                    item.quantity -= 1;
                                } else {
                                    this.items = this.items.filter(item => item.id !== id);
                                }
                                this.updateCart();
                            });
                        });
                        
                        document.querySelectorAll('.remove-item').forEach(button => {
                            button.addEventListener('click', (e) => {
                                const id = e.target.getAttribute('data-id');
                                this.items = this.items.filter(item => item.id !== id);
                                this.updateCart();
                            });
                        });
                    }
                }
            };
            




            // Agregar productos al carrito
            document.querySelectorAll('.product-card button').forEach(button => {
                button.addEventListener('click', function() {
                    const card = this.closest('.product-card');
                    const product = {
                        id: card.querySelector('img').getAttribute('src'),
                        name: card.querySelector('.card-title').textContent,
                        price: parseFloat(card.querySelector('.price').textContent.replace('$', '')),
                        image: card.querySelector('img').getAttribute('src')
                    };
                    
                    cart.addItem(product);
                    
                    // Mostrar notificación
                    const toast = document.createElement('div');
                    toast.className = 'position-fixed bottom-0 end-0 p-3';
                    toast.style.zIndex = '11';
                    toast.innerHTML = `
                        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header bg-success text-white">
                                <strong class="me-auto">Producto agregado</strong>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                ${product.name} se ha añadido al carrito
                            </div>
                        </div>
                    `;
                    
                    document.body.appendChild(toast);
                    
                    setTimeout(() => {
                        toast.remove();
                    }, 3000);
                });
            });
            
            // Validación del formulario (se mantiene igual)
            
        });
  
//Modal de fin de compra

// Reemplaza el código existente del carrito con este:
document.addEventListener('DOMContentLoaded', function() {
    const cart = {
        items: [],
        total: 0,
        
        // ... (el resto de los métodos del carrito se mantienen igual hasta updateCart) ...
        
        updateCart: function() {
            const cartItemsEl = document.getElementById('cartItems');
            const cartCounterEl = document.getElementById('cartCounter');
            const cartSubtotalEl = document.getElementById('cartSubtotal');
            const cartTotalEl = document.getElementById('cartTotal');
            const checkoutBtn = document.getElementById('checkoutBtn');
            
            // Calcular totales
            this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = this.total > 0 ? 5.00 : 0.00;
            const totalWithShipping = this.total + shipping;
            
            // Actualizar contador
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCounterEl.textContent = totalItems;
            
            // Actualizar resumen
            cartSubtotalEl.textContent = `$${this.total.toFixed(2)}`;
            document.getElementById('cartShipping').textContent = `$${shipping.toFixed(2)}`;
            cartTotalEl.textContent = `$${totalWithShipping.toFixed(2)}`;
            
            // Actualizar lista de items
            if (this.items.length === 0) {
                cartItemsEl.innerHTML = '<p class="text-muted text-center py-3">Tu carrito está vacío</p>';
                checkoutBtn.disabled = true;
            } else {
                cartItemsEl.innerHTML = this.items.map(item => `
                    <div class="cart-item d-flex align-items-center mb-3 pb-3 border-bottom">
                        <img src="${item.image}" alt="${item.name}" class="rounded me-3" width="60">
                        <div class="flex-grow-1">
                            <h6 class="mb-1">${item.name}</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="input-group input-group-sm" style="width: 100px;">
                                    <button class="btn btn-outline-secondary decrease-qty" data-id="${item.id}">-</button>
                                    <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                                    <button class="btn btn-outline-secondary increase-qty" data-id="${item.id}">+</button>
                                </div>
                                <span class="fw-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline-danger ms-2 remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('');
                
                checkoutBtn.disabled = false;
                
                // Agregar event listeners a los botones de cantidad
                document.querySelectorAll('.increase-qty').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const id = e.target.getAttribute('data-id');
                        const item = this.items.find(item => item.id === id);
                        if (item) item.quantity += 1;
                        this.updateCart();
                    });
                });
                
                document.querySelectorAll('.decrease-qty').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const id = e.target.getAttribute('data-id');
                        const item = this.items.find(item => item.id === id);
                        if (item && item.quantity > 1) {
                            item.quantity -= 1;
                        } else {
                            this.items = this.items.filter(item => item.id !== id);
                        }
                        this.updateCart();
                    });
                });
                
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const id = e.target.getAttribute('data-id');
                        this.items = this.items.filter(item => item.id !== id);
                        this.updateCart();
                    });
                });
                
                // Evento para finalizar compra
                checkoutBtn.addEventListener('click', function() {
                    
                                            // Mostrar notificación
                    const toast = document.createElement('div');
                    toast.className = 'position-fixed bottom-0 end-0 p-3';
                    toast.style.zIndex = '11';
                    toast.innerHTML = 
                    `
                        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header bg-success text-white">
                                <strong class="me-auto">Compra finalizada</strong>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                            </div>
                            <div class="toast-body">
                                --
                            </div>
                        </div>
                    `
                    
                    document.body.appendChild(toast);
                    
                    setTimeout(() => {
                        toast.remove();
                    }, 3000);
                   
                });
            }
        }
    };
    
    
});



