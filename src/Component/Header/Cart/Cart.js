import React from 'react';
import Product from '../Product/Product';
import './Cart.css';
import { useAuth } from '../../LogIn/useAuth';



const Cart = (props) => {
    
    const cart = props.cart;
    const auth = useAuth();
    
    console.log(auth.user);
    
    // const total = cart.reduce((total,product) => total + product.price,0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
        
    }
    let shipping = 0;
    if(total > 35){
        shipping  = 0;
    }else if(total > 15){
        shipping  = 4.99;

    }else if(total > 0){
        shipping  =12.99;
    }
    let tex1 = (total /100) * 10;
    let tex = parseFloat(tex1.toFixed(2));

    let totalSum = (total + tex + shipping  );
    return (
        <div className="cart-contain">
            <h4>Order Summary</h4>
            <h4>Order Items: {cart.length}</h4>
            <p>Price: { parseFloat(total.toFixed(2))} $</p>
            <p>Shipping Cost : {parseFloat(shipping )} $</p>
            <p>Text-Vat: {tex} $</p>
            <h3>Total Sum : {parseFloat(totalSum.toFixed(2))} $</h3>
            {
                props.children
            }
          
        </div>
    );
};

export default Cart;