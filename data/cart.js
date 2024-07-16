export let cart= JSON.parse(localStorage.getItem('cart'));

if(!cart){
   cart= [{
        productId:
        'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
    }, {
        productId:
        '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:2,
    }, {
        productId:
        '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity:2,
    }]}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart))
}

export function addToCart(productId,selectedQuantity){
    
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    })

    if(matchingItem)
    {
        matchingItem.quantity += selectedQuantity;
    }
    else
    {
        cart.push({
            productId: productId,
            quantity: selectedQuantity
        })
    }
    
    saveToStorage();

}

export function removeFromCart(productId){
    const newCart =[];

    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem)
        }
    });

    cart = newCart;
    saveToStorage();
}