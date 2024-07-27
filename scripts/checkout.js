import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProductsFetch } from "../data/products.js";

async function loadPage(){
    try 
    {
    await loadProductsFetch();
    } 
    catch(error)
    {
        console.log("Error loading products");
    }
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();


/*
loadProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})*/

//USING PROMISES !!!!

/*
new Promise((resolve) => {
    loadProducts(()=>{
        resolve();
    })
    }).then(()=>{
        renderOrderSummary();
        renderPaymentSummary();
});
*/

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
