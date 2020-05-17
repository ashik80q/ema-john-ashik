import React, { useState, useEffect } from 'react';
import fakeData from '../../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop =  (props) => {
    console.log(props);
    
    const fakeData10 = fakeData.slice(0,10);
    const [product, setProducts] = useState(fakeData10);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProduct);
    },[])
    const handlerAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
           count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        
      setCart(newCart);
     
      addToDatabaseCart(product.key, count)
    }

    return (
        <div className="mine-container">
            <div className='product-container'>
             {product.map(pd =>  <Product 
             key = {pd.key}
             product={pd}
             handlerAddProduct = {handlerAddProduct}
             showAddToCart ={true}
             ></Product>)}
            </div>

            <div className="cart-container">
             <Cart cart={cart}></Cart>
             <Link to="/review"> <button className="main-button">Review</button></Link>
            </div>
            
        </div>
    );
};

export default Shop;