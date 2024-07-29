import { orders } from '../../data/orders.js';

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');
  
  if (!orderId) {
    console.error('No orderId specified in URL');
    return;
  }

  const order = orders.find(order => order.id === orderId);
  
  if (!order) {
    console.error('Order not found');
    return;
  }

  // Update the delivery date
  const deliveryDateElement = document.querySelector('.delivery-date');
  const productInfoElements = document.querySelectorAll('.product-info');
  const productImageElement = document.querySelector('.product-image');
  const progressBarElement = document.querySelector('.progress-bar');

  deliveryDateElement.textContent = `Arriving on ${order.products[0].deliveryDate}`;
  
  // Update the product info and image
  productInfoElements[0].textContent = order.products[0].name;
  productInfoElements[1].textContent = `Quantity: ${order.products[0].quantity}`;
  productImageElement.src = order.products[0].image;
  
  // Dynamically generate progress bar labels and statuses based on order status
  const progressLabels = [
    { label: 'Preparing', status: 'preparing' },
    { label: 'Shipped', status: 'shipped' },
    { label: 'Delivered', status: 'delivered' }
  ];

  progressBarElement.innerHTML = ''; // Clear existing progress bar
  const progressLabelsContainer = document.querySelector('.progress-labels-container');
  progressLabelsContainer.innerHTML = ''; // Clear existing labels

  let currentStatusFound = false;

  progressLabels.forEach(progressLabel => {
    const labelDiv = document.createElement('div');
    labelDiv.classList.add('progress-label');
    labelDiv.textContent = progressLabel.label;

    if (!currentStatusFound && order.status === progressLabel.status) {
      labelDiv.classList.add('current-status');
      currentStatusFound = true;
    }

    progressLabelsContainer.appendChild(labelDiv);
    
    // Add progress bar segment
    const progressBarSegment = document.createElement('div');
    progressBarSegment.classList.add('progress-bar-segment');
    if (order.status === progressLabel.status || currentStatusFound) {
      progressBarSegment.classList.add('completed');
    }

    progressBarElement.appendChild(progressBarSegment);
  });
});
