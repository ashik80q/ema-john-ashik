import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../LogIn/useAuth';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { getDatabaseCart, clearLocalShoppingCard  } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckOutForm/CheckOutForm';
import { useState } from 'react';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);
   const auth = useAuth();
   const stripePromise = loadStripe('pk_test_51GrHMiIH5oRdtJYkGMUkxTM5ptQp03fV9bgiMFShYBl6If5gzT3GzHu46DvZjztJiLPZ3iny4Lb26P6jNeRSgZEJ006rLyYC1h');

    const onSubmit = data => {
      setShipInfo(data);
   

    }
    const handlePlaceOrder= (payment)=>{
         //TODO:Samad move this after payment
      // console.log(auth.user.email);
      
      const savedCart = getDatabaseCart();
      const orderDetails = {
        email:auth.user.email, 
        cart:savedCart,
        shipment: shipInfo,
        payment: payment
      };
      fetch('https://secret-scrubland-75972.herokuapp.com/placeOrder',{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
      
        },
        
        body: JSON.stringify(orderDetails) // body data type must match "Content-Type" header
      

    })
    .then(res => res.json())
    .then(orderData =>{
         setOrderId(orderData._id);
     
         clearLocalShoppingCard ();

      
    })

    }
 
  
    return (
     
      <div className="container">
        <div className="row">
          <div className="col-md-6" style={{display: shipInfo && 'none'}}>
            <h3>Shipment Information</h3>
            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            
            <input name="name" defaultValue={auth.user.name} ref={register({required: true})} placeholder="Your name"/>
            {errors.name && <span className="error">Name is required</span>}

            <input name="email"  defaultValue={auth.user.email} ref={register({required: true})} placeholder="Your email"/>
            {errors.email && <span className="error">email is required</span>}

            <input name="AddressLine1"  ref={register({required: true})} placeholder="Address Line1"/>
            {errors.AddressLine1 && <span className="error">AddressLine1 is required</span>}

            <input name="AddressLine2"  ref={register} placeholder="Address Line2"/>
            

            <input name="City"  ref={register({required: true})} placeholder="City"/>
            {errors.City && <span className="error">City is required</span>}

            <input name="Country"  ref={register({required: true})} placeholder="Country"  />
            {errors.Country && <span className="error">Country is required</span>}
          

            <input name="zipcode"  ref={register({required: true})} placeholder="zip code"  />
            {errors.Country && <span className="error">Country is required</span>}
            

            <input type="submit" />
          </form>
          </div>
          <div className="col-md-6" style={
            { marginTop:'200px',display: shipInfo ? 'block' : 'none'}
            }>
            <h3>Payment Information</h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
            </Elements>
            <br/>
            {
              orderId && 
              <div>
                 <h3>Thank you shopping with us</h3>
                 <p>You order id is: {orderId}</p>
              </div>
            }
           
          </div>
        </div>  
      </div>
    );
};

export default Shipment;

