import React from 'react';
import Auth from './useAuth';

const LogIn = () => {
    const auth = Auth();
   const handleSignIn = () =>{
       auth.singInWithGoogle()
       .then(res =>{
           window.location.pathname="/review";
           
       })
   }
    const handleSigOut = () =>{
        auth.signOut()
        .then (res =>{
            window.location.pathname="/shop"
        })
    }
    return (
        <div>
            <h1>Join the website</h1>
            {
                auth.user ? <button onClick={handleSigOut}>Sign out</button>:
                <button onClick={handleSignIn}>Sign In with google</button>

            }
        </div>
    );
};

export default LogIn;