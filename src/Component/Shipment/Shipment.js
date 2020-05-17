import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../LogIn/useAuth';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
  
   const auth = useAuth();
  
    return (
     
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
    );
};

export default Shipment;