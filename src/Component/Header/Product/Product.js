import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
const Product = (props) => {

   
    // console.log(props);
    const {name, seller,stock,price,img,key } = props.product;
    return (
        <div className="data-area">
        <div className="product-img">
            <img  src={img} alt=""/>
        </div>

        <div  className="product-name">
            <h4 > <Link to={'/product/' + key}>{name}</Link></h4>
            <p> by <small>{seller}</small></p>
           <p>${price}</p>
           <p>Only {stock} left in  stock, order soon</p>
           {props.showAddToCart === true &&<button className="main-button" onClick={() =>props.handlerAddProduct(props.product)}> Add to Cart</button>}

           
        </div>
       
    </div>
    );
};

export default Product;