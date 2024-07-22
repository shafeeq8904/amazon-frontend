import {cart , removeFromCart,calculateCartQuantity,updateQuantity,updateDeliveryOption} from '../../data/cart.js'
import { products , getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
//importing external library which has exactly one function
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

/*const today = dayjs();
const delivery_date = today.add(7, 'days');
console.log(delivery_date.format('dddd, MMMM D'))*/


export function renderOrderSummary(){

    let cartSummaryHtml = ''


    cart.forEach((cartItem)=>{   

        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);
       

        if (!matchingProduct) {
            console.error(`Product with ID ${productId} not found in products`);
            return;
        }


        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId)
       
        const today =dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');
        
    cartSummaryHtml +=
        
    `
        <div class="cart-item-container js-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                    ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                    $${(matchingProduct.priceCents / 100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                        Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct,cartItem)}
                    </div>
                </div>
                </div> 
        `
    });

    function deliveryOptionsHTML(matchingProduct,cartItem){
        let html=''
        deliveryOptions.forEach((deliveryOption)=>{

            const today =dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays, 'days'
            );
            const dateString = deliveryDate.format('dddd, MMMM D');
            const pricestring = deliveryOption.priceCents === 0?'FREE': `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id ===
            cartItem.deliveryOptionId
            
            html+=
            
            `
            <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                        <div>
                        <div class="delivery-option-date">
                        ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${pricestring} Shipping
                        </div>
                        </div>
                    </div>

            `
        });
        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);

                const container = document.querySelector(`.js-item-container-${productId}`);
                container.remove();
                updateCartQuantity();
            });
        });

    document.querySelectorAll('.js-update-link')
        .forEach((updatelink) => {
            updatelink.addEventListener('click', () => {
                const productId = updatelink.dataset.productId;
                
                const container = document.querySelector(
                    `.js-item-container-${productId}`
                );
                container.classList.add('is-editing-quantity'); 
            });
        });

    document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;

                const container = document.querySelector(
                    `.js-item-container-${productId}`
                );
                container.classList.remove('is-editing-quantity');
                
                const quantityInput = document.querySelector(
                    `.js-quantity-input-${productId}`
                );
                const newQuantity = Number(quantityInput.value);
                updateQuantity(productId, newQuantity);
                renderOrderSummary();
                renderPaymentSummary();
            });
        });

    function updateCartQuantity() {
        const cartQuantity = calculateCartQuantity();
        document.querySelector('.js-return-to-home-link')
            .textContent = `${cartQuantity} items`;
    }

    updateCartQuantity();

    document.querySelectorAll('.js-delivery-option')
        .forEach((element)=>{
            element.addEventListener('click',()=>{
                const {productId,deliveryOptionId}=element.dataset
                updateDeliveryOption(productId,deliveryOptionId)
                renderOrderSummary();
                renderPaymentSummary();
            });
        });

    }



