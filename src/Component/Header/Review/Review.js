import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../../utilities/databaseManager';
import fakeData from '../../../fakeData';
import ReviewItem from '../../ReviewItem/ReviewItem';
import Shop from '../Shop/Shop';
import Cart from '../Cart/Cart';
import happyImg from '../../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../../LogIn/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);
    const auth = useAuth();
    
    const handelOrderPlace = ()=>{
         
        setCart([]);
        setOrderPlace(true);
         processOrder();
     }
  
        const removeItem = (productKeys) =>{
            const newCart = cart.filter(pd => pd.key !== productKeys)
            setCart(newCart);
            removeFromDatabaseCart(productKeys);
            
            
        }

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
           product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProduct);
       
        
    },[]);
    let thank;
    if(orderPlace){
        thank = <img src={happyImg} alt=""/>
    }
    return (
        <div className="mine-container">
            
           <div className='product-container'>
           {
                cart.map(pd => <ReviewItem 
                    removeItem = {removeItem}
                    product={pd}
                    
                    ></ReviewItem>)
            }
            {thank}
            {
                !cart.length && <h1>You car is empty. <a href="/shop">Keep shopping</a></h1>
            }
           </div>
           <div  className="cart-container">
             <Cart cart={cart}>
               <Link to='/shipment'>
              {
                  auth.user ?
                  <button className="main-button">Proceed Checkout</button>
                  :
                  <button className="main-button">Login Proceed</button>
              }
               </Link>
             </Cart>
           </div>
        </div>
    );
};

export default Review;