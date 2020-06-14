import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../../utilities/databaseManager';
import ReviewItem from '../../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../../LogIn/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);

    const auth = useAuth();
    
    // const handelOrderPlace = ()=>{
         
    //     setCart([]);
    //     setOrderPlace(true);
    //      processOrder();
    //  }
  
        const removeItem = (productKeys) =>{
            const newCart = cart.filter(pd => pd.key !== productKeys)
            setCart(newCart);
            removeFromDatabaseCart(productKeys);
            
            
        }

    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        // console.log(productKeys);
        
        fetch('https://secret-scrubland-75972.herokuapp.com/getProductsByKey', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
          
            },
            
            body: JSON.stringify(productKeys) // body data type must match "Content-Type" header
          

        })
        .then(res => res.json())
        .then(data => {
            const cartProduct = productKeys.map(key => {
                const product = data.find(pd => pd.key === key);
               product.quantity = saveCart[key];
                return product;
            });
            setCart(cartProduct);
        }); 
    },[]);
   
    return (
        <div className="mine-container">
            
           <div className='product-container'>
           {
                cart.map(pd => <ReviewItem 
                    key = {pd.key}
                    removeItem = {removeItem}
                    product={pd}
                    
                    ></ReviewItem>)
            }
           
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