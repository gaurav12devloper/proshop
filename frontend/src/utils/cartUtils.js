// it used to add the decimals to the price
export const addDecimals =(num) => {
    return (Math.round(num*100)/100).toFixed(2);
}

export const updateCart =(state) => {
     // Calculate item price
     state.itemsPrice = addDecimals(state.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0));
            
     //Calculate shpping price (if order is over $100 then else 10$ shipping price)
     state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

     //Calculate tax price (15% tax)
     state.taxPrice=addDecimals(Number((0.15 * state.itemsPrice)));

     //Calculate total price
     state.totalPrice = (Number(state.itemPrice)+
     Number(state.shippingPrice)+
     Number(state.taxPrice)).toFixed(2);
     
     localStorage.setItem('cart',JSON.stringify(state));
     return state;
}