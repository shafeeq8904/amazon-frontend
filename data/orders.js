/*export const orders = JSON.parse(localStorage.getItem('orders')) || [];


export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}*/
import { formatCurrency } from "../scripts/utils/money.js";

// Ensure there is no duplicate declaration of 'orders'
const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function clearOrders() {
    localStorage.removeItem('orders');
  }
  

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function renderOrders() {
  if (orders.length === 0) return;  
  const ordersGrid = document.querySelector('.orders-grid');
  if (!ordersGrid) return;

  ordersGrid.innerHTML = '';

  orders.forEach(order => {
    const orderHTML = `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${new Date(order.date).toLocaleDateString()}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${order.products.map(product => `
            <div class="product-image-container">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
              <div class="product-name">${product.name}</div>
              <div class="product-delivery-date">Arriving on: ${product.deliveryDate}</div>
              <div class="product-quantity">Quantity: ${product.quantity}</div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>
            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">Track package</button>
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    ordersGrid.insertAdjacentHTML('beforeend', orderHTML);
  });
}

// Load and render orders on page load
document.addEventListener('DOMContentLoaded', renderOrders);

export { orders };
