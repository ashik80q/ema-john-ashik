import React from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Component/Header/Header';
import Shop from './Component/Header/Shop/Shop';
import Review from './Component/Header/Review/Review';
import Inventory from './Component/Header/Inventory/Inventory';
import Notfount from './Notfount/Notfount';
import ProductDetail from './ProdcutDetail/ProductDetail';
import LogIn from './Component/LogIn/LogIn';
import { createContext } from 'react';
import { AuthContextProvider, PrivateRoute } from './Component/LogIn/useAuth';
import Shipment from './Component/Shipment/Shipment';




function App(props) {
  
  return (
    <div>
     
     <AuthContextProvider>
        <Header></Header>
            <Router>
             <Switch>
              <Route path="/shop">
                <Shop></Shop>
                </Route>
                <Route path="/review">
                <Review></Review>
                </Route>
                <Route path="/inventory">
                <Inventory></Inventory>
                </Route>
                <Route exact path="/">
                <Shop></Shop>
                </Route>
                <Route path="/product/:productKey">
                <ProductDetail></ProductDetail>
                </Route>
                <Route path="/login">
                  <LogIn></LogIn>
                </Route>
                <PrivateRoute path="/shipment">
                  <Shipment></Shipment>
                </PrivateRoute>
                <Route  path="*">
                <Notfount></Notfount>
              </Route>
            </Switch>
          </Router>
        </AuthContextProvider>
    </div>
  );
}

export default App;
