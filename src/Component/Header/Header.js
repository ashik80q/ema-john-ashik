import React from 'react';
import log from '../../images/logo.png';
import './Header.css';
import { useAuth } from '../LogIn/useAuth';


const Header = () => {
    const auth = useAuth();
   
    
    return (
        <div className="header">
            <img src={log} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Inventory </a>
                {
                    auth.user &&
                <span style={{color:'yellow'}}>Welcome {auth.user.name}</span>
                
                 
                }
                {
                    auth.user ? <a href="/login">Sign in</a>
                    :<a href="/login">Sign in</a>
                }
            </nav>
        </div>
    );
};

export default Header;