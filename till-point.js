
const products = [
    { id: 1, name: "Coffee", price: 3.99, icon: "fas fa-coffee", category: "Beverage" },
    { id: 2, name: "Tea", price: 2.99, icon: "fas fa-mug-hot", category: "Beverage" },
    { id: 3, name: "Sandwich", price: 6.99, icon: "fas fa-hamburger", category: "Food" },
    { id: 4, name: "Salad", price: 5.99, icon: "fas fa-leaf", category: "Food" },
    { id: 5, name: "Cookie", price: 1.99, icon: "fas fa-cookie", category: "Snack" },
    { id: 6, name: "Cake Slice", price: 4.49, icon: "fas fa-birthday-cake", category: "Snack" },
    { id: 7, name: "Juice", price: 3.49, icon: "fas fa-glass-whiskey", category: "Beverage" },
    { id: 8, name: "Smoothie", price: 5.49, icon: "fas fa-blender", category: "Beverage" },
    { id: 9, name: "Muffin", price: 2.49, icon: "fas fa-cookie-bite", category: "Snack" },
    { id: 10, name: "Croissant", price: 2.99, icon: "fas fa-bread-slice", category: "Snack" },
    { id: 11, name: "Bagel", price: 1.99, icon: "fas fa-circle", category: "Snack" },
    { id: 12, name: "Water", price: 1.49, icon: "fas fa-tint", category: "Beverage" },
    { id: 13, name: "Soda", price: 1.99, icon: "fas fa-wine-bottle", category: "Beverage" },
    { id: 14, name: "Wrap", price: 7.49, icon: "fas fa-utensils", category: "Food" },
    { id: 15, name: "Soup", price: 4.99, icon: "fas fa-soup", category: "Food" },
    { id: 16, name: "Pasta", price: 8.99, icon: "fas fa-utensils", category: "Food" },
    { id: 17, name: "Pizza Slice", price: 3.99, icon: "fas fa-pizza-slice", category: "Food" },
    { id: 18, name: "Donut", price: 1.49, icon: "fas fa-dot-circle", category: "Snack" },
    { id: 19, name: "Brownie", price: 2.99, icon: "fas fa-square", category: "Snack" },
    { id: 20, name: "Ice Cream", price: 3.99, icon: "fas fa-ice-cream", category: "Snack" },
    { id: 21, name: "Milk", price: 2.49, icon: "fas fa-wine-glass", category: "Beverage" },
    { id: 22, name: "Hot Chocolate", price: 3.49, icon: "fas fa-mug-hot", category: "Beverage" },
    { id: 23, name: "Panini", price: 6.49, icon: "fas fa-hamburger", category: "Food" },
    { id: 24, name: "Quiche", price: 5.99, icon: "fas fa-chart-pie", category: "Food" }
];


let cart = [];
let cashierName = '';
let employeeId = '';
let selectedPaymentMethod = null;
let completedTransaction = null;


const productsGrid = document.getElementById('productsGrid');
const transactionItems = document.getElementById('transactionItems');
const searchInput = document.getElementById('searchInput');
const payButton = document.getElementById('payButton');
const clearTransactionBtn = document.getElementById('clearTransaction');
const modal = document.getElementById('paymentModal');
const closeModalBtn = document.getElementById('closeModal');
const paymentTotal = document.getElementById('paymentTotal');
const paymentCashierName = document.getElementById('paymentCashierName');
const paymentMethods = document.querySelectorAll('.payment-method');
const cashPayment = document.getElementById('cashPayment');
const amountReceived = document.getElementById('amountReceived');
const changeAmount = document.getElementById('changeAmount');
const completePaymentBtn = document.getElementById('completePayment');
const successMessage = document.getElementById('successMessage');
const itemCountEl = document.getElementById('itemCount');
const transactionSubtotalEl = document.getElementById('transactionSubtotal');
const transactionTaxEl = document.getElementById('transactionTax');
const transactionTotalEl = document.getElementById('transactionTotal');
const cashierLogin = document.getElementById('cashierLogin');
const cashierDashboard = document.getElementById('cashierDashboard');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const cashierNameInput = document.getElementById('cashierName');
const employeeIdInput = document.getElementById('employeeId');
const displayCashierName = document.getElementById('displayCashierName');
const displayEmployeeId = document.getElementById('displayEmployeeId');

const receiptModal = document.getElementById('receiptModal');
const closeReceiptBtn = document.getElementById('closeReceipt');
const receiptBody = document.getElementById('receiptBody');
const printReceiptBtn = document.getElementById('printReceipt');
const newSaleBtn = document.getElementById('newSale');


document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateDateTime();
    setInterval(updateDateTime, 1000);
    updateTransaction();
    setupReceiptEvents();
});


function setupReceiptEvents() {
    if (closeReceiptBtn) {
        closeReceiptBtn.addEventListener('click', closeReceiptModal);
    }
    if (receiptModal) {
        receiptModal.addEventListener('click', (e) => {
            if (e.target === receiptModal) closeReceiptModal();
        });
    }
    if (printReceiptBtn) {
        printReceiptBtn.addEventListener('click', printReceipt);
    }
    if (newSaleBtn) {
        newSaleBtn.addEventListener('click', startNewSale);
    }
}


function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
    document.getElementById('currentTime').textContent = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}


loginBtn.addEventListener('click', () => {
    const name = cashierNameInput.value.trim();
    const id = employeeIdInput.value.trim();
    
    if (!name || !id) {
        alert('Please enter both your name and employee ID');
        return;
    }
    
    cashierName = name;
    employeeId = id;
    
    displayCashierName.textContent = name;
    displayEmployeeId.textContent = `ID: ${id}`;
    
    cashierLogin.style.display = 'none';
    cashierDashboard.style.display = 'flex';
});


logoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        if (!confirm('You have items in the transaction. Are you sure you want to log out?')) {
            return;
        }
    }
    
    cashierName = '';
    employeeId = '';
    cart = [];
    
    cashierNameInput.value = '';
    employeeIdInput.value = '';
    cashierLogin.style.display = 'block';
    cashierDashboard.style.display = 'none';
    
    updateTransaction();
    updateProductCards();
});


function renderProducts(productsToRender) {
    productsGrid.innerHTML = productsToRender.map(product => {
        const cartItem = cart.find(item => item.id === product.id);
        const qty = cartItem ? cartItem.quantity : 0;
        
        return `
            <div class="product-card ${qty > 0 ? 'in-cart' : ''}" data-id="${product.id}">
                ${qty > 0 ? `<span class="product-qty-badge">${qty}</span>` : ''}
                <div class="product-icon">
                    <i class="${product.icon}"></i>
                </div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">R${product.price.toFixed(2)}</div>
            </div>
        `;
    }).join('');

    
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => addToCart(parseInt(card.dataset.id)));
    });
}


searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.category.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
});


function updateProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        const productId = parseInt(card.dataset.id);
        const cartItem = cart.find(item => item.id === productId);
        const qty = cartItem ? cartItem.quantity : 0;
        
        if (qty > 0) {
            card.classList.add('in-cart');
            let badge = card.querySelector('.product-qty-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'product-qty-badge';
                card.appendChild(badge);
            }
            badge.textContent = qty;
        } else {
            card.classList.remove('in-cart');
            const badge = card.querySelector('.product-qty-badge');
            if (badge) badge.remove();
        }
    });
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateTransaction();
    updateProductCards();
    
   
    const card = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (card) {
        card.classList.add('adding');
        setTimeout(() => card.classList.remove('adding'), 200);
    }
}

function updateTransaction() {
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    itemCountEl.textContent = totalItems;
    
    
    if (cart.length === 0) {
        transactionItems.innerHTML = `
            <div class="empty-transaction">
                <i class="fas fa-shopping-basket"></i>
                <p>No items selected yet</p>
            </div>
        `;
    } else {
        transactionItems.innerHTML = cart.map(item => `
            <div class="transaction-item" data-id="${item.id}">
                <div class="transaction-item-info">
                    <div class="transaction-item-name">${item.name}</div>
                    <div class="transaction-item-details">R${item.price.toFixed(2)} each</div>
                </div>
                <div class="transaction-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="transaction-item-total">R${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    }
    
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    transactionSubtotalEl.textContent = `R${subtotal.toFixed(2)}`;
    transactionTaxEl.textContent = `R${tax.toFixed(2)}`;
    transactionTotalEl.textContent = `R${total.toFixed(2)}`;
}


function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateTransaction();
            updateProductCards();
        }
    }
}


function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateTransaction();
    updateProductCards();
}


clearTransactionBtn.addEventListener('click', () => {
    if (cart.length > 0 && confirm('Are you sure you want to clear the transaction?')) {
        cart = [];
        updateTransaction();
        updateProductCards();
    }
});


payButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Please add items to the transaction first!');
        return;
    }
    
    if (!cashierName) {
        alert('Please log in as a cashier first!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.1;
    paymentTotal.textContent = `R${total.toFixed(2)}`;
    paymentCashierName.textContent = cashierName;
    
    
    selectedPaymentMethod = null;
    paymentMethods.forEach(m => m.classList.remove('selected'));
    cashPayment.style.display = 'none';
    amountReceived.value = '';
    changeAmount.textContent = 'R0.00';
    completePaymentBtn.disabled = true;
    
    modal.classList.add('active');
});

closeModalBtn.addEventListener('click', closePaymentModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closePaymentModal();
});

function closePaymentModal() {
    modal.classList.remove('active');
}


paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
        paymentMethods.forEach(m => m.classList.remove('selected'));
        method.classList.add('selected');
        selectedPaymentMethod = method.dataset.method;
        
        if (selectedPaymentMethod === 'cash') {
            cashPayment.style.display = 'block';
        } else {
            cashPayment.style.display = 'none';
            completePaymentBtn.disabled = false;
        }
    });
});


amountReceived.addEventListener('input', (e) => {
    const received = parseFloat(e.target.value) || 0;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.1;
    const change = received - total;
    changeAmount.textContent = `R${Math.max(0, change).toFixed(2)}`;
    completePaymentBtn.disabled = change < 0;
});


completePaymentBtn.addEventListener('click', () => {
 
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    const received = selectedPaymentMethod === 'cash' ? parseFloat(amountReceived.value) || 0 : total;
    const change = received - total;
    
    completedTransaction = {
        items: [...cart],
        subtotal: subtotal,
        tax: tax,
        total: total,
        cashierName: cashierName,
        employeeId: employeeId,
        paymentMethod: selectedPaymentMethod,
        amountReceived: received,
        change: Math.max(0, change),
        date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    
    closePaymentModal();
    
    
    generateReceipt(completedTransaction);
    
    
    cart = [];
    updateTransaction();
    updateProductCards();
});

function generateReceipt(transaction) {
    const itemsHTML = transaction.items.map(item => `
        <div class="receipt-item">
            <span class="receipt-item-name">${item.name}</span>
            <span class="receipt-item-qty">x${item.quantity}</span>
            <span class="receipt-item-price">R${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    const paymentMethodName = transaction.paymentMethod === 'cash' ? 'Cash' : 
                             transaction.paymentMethod === 'card' ? 'Card' : 'Mobile';
    
    receiptBody.innerHTML = `
        <div class="receipt-header">
            <div class="receipt-store-name">Kopano Store</div>
            <div class="receipt-store-info">123 Main Street, Mahikeng</div>
            <div class="receipt-store-info">Tel: 018 765 7656</div>
        </div>
        
        <div class="receipt-transaction-info">
            <span>Date: ${transaction.date}</span>
            <span>Time: ${transaction.time}</span>
        </div>
        
        <div class="receipt-transaction-info">
            <span>Cashier: ${transaction.cashierName}</span>
            <span>ID: ${transaction.employeeId}</span>
        </div>
        
        <div class="receipt-items">
            ${itemsHTML}
        </div>
        
        <div class="receipt-totals">
            <div class="receipt-total-row">
                <span>Subtotal:</span>
                <span>R${transaction.subtotal.toFixed(2)}</span>
            </div>
            <div class="receipt-total-row">
                <span>Tax (10%):</span>
                <span>R${transaction.tax.toFixed(2)}</span>
            </div>
            <div class="receipt-total-row grand-total">
                <span>TOTAL:</span>
                <span>R${transaction.total.toFixed(2)}</span>
            </div>
        </div>
        
        <div class="receipt-payment-info">
            <div>Payment Method: <span class="receipt-payment-method">${paymentMethodName}</span></div>
            ${transaction.paymentMethod === 'cash' ? `
                <div>Amount Received: R${transaction.amountReceived.toFixed(2)}</div>
                <div>Change: R${transaction.change.toFixed(2)}</div>
            ` : ''}
        </div>
        
        <div class="receipt-footer">
            <p>Thank you for shopping with us!</p>
            <p>Please come again</p>
        </div>
    `;
    
    receiptModal.classList.add('active');
}


function closeReceiptModal() {
    receiptModal.classList.remove('active');
    completedTransaction = null;
}


function printReceipt() {
    window.print();
}


function startNewSale() {
    closeReceiptModal();
}
