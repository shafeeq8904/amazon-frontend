import { calculateCartQuantity, cart,clearCart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder} from "../../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export function renderPaymentSummary(){

    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem)=>{
       const product = getProduct(cartItem.productId)
       productPriceCents += product.priceCents * cartItem.quantity;
       
       const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
       shippingPriceCents += deliveryOption.priceCents;

    });

    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const  totalCents = totalBeforeTax + taxCents ;

    const PaymentSummaryHTML = 
    
    `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML =  PaymentSummaryHTML;

    document.querySelector('.js-place-order').addEventListener('click', async () => {
      const placeOrderButton = document.querySelector('.js-place-order');
      
      // Disable the button and change its text
      placeOrderButton.disabled = true;
      placeOrderButton.textContent = 'Processing your request...';
    
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cart: cart,
          }),
        });
    
        const orderData = await response.json();
            const order = {
                id: orderData.id,
                date: new Date().toISOString(),
                totalCents: totalCents,
                products: cart.map(cartItem => {
                    const product = getProduct(cartItem.productId);
                    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
                    return {
                        ...product,
                        deliveryDate: dayjs().add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D'),
                        quantity: cartItem.quantity,
                    };
                })
            };
  
        addOrder(order);
        clearCart();
        document.querySelector('.js-order-summary').innerHTML = '';
        document.querySelector('.js-payment-summary').innerHTML = '';
        window.location.href= 'orders.html';
        
    
        // Optionally, change the button text to something else or keep it disabled
        placeOrderButton.textContent = 'Order Placed';
      } catch (error) {
        console.error('Error placing order:', error);
    
        // Re-enable the button and reset its text if there was an error
        placeOrderButton.disabled = false;
        placeOrderButton.textContent = 'Place Order';
      }

      
    });
}

