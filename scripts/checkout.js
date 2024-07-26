import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";

/*
loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})*/

//USING PROMISES !!!!

new Promise((resolve) => {
    loadProducts(()=>{
        resolve();
    })
    }).then(()=>{
        renderOrderSummary();
        renderPaymentSummary();
});


/*
new promise((resolve)=>{
    loadProducts(()=>{
        resolve();
        }
    });
}).then(()=>{
    return new promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })
}).then(()=>{
    render.....
    })
*/ 
