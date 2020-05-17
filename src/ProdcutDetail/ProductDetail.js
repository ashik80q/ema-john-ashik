import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../fakeData';
import Product from '../Component/Header/Product/Product';

const ProductDetail = () => {
 const {productKey} = useParams();
 const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
           <h1>{productKey} Product Detail coming soon</h1> 
           <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;