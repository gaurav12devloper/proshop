import React from 'react';
import ReactDOM from 'react-dom/client';
import  { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'; //npm i @paypal/react-paypal-js
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import OrderListScreen from './screens/admin/OrderListScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { Provider } from 'react-redux';
import store from  './store.js'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
const router=createBrowserRouter(createRoutesFromElements(
<Route path="/" element={<App />}>
   <Route index={true} path="/" element={<HomeScreen/>} /> 
   <Route path='/search/:keyword' element={<HomeScreen />} />
   <Route path="/page/:pageNumber" element={<HomeScreen/>} /> 
   <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
   
  <Route path="/product/:id" element={<ProductScreen/>} />
  <Route path="/cart" element={<CartScreen/>} />
  <Route path="/login" element={<LoginScreen/>} /> 
  <Route path="/register" element={<RegisterScreen/>} /> 

  <Route path='' element={<PrivateRoute />}> 
      <Route path='/shipping' element={<ShippingScreen/>} /> { /* this is a private route if user is not loggin then he will not be able to show shipping page */}
      <Route path='/payment' element={<PaymentScreen />}/> { /* this is a private route if user is not loggin then he will not be able to show payment page */}
      <Route path='/placeorder' element={<PlaceOrderScreen/>} /> { /* this is a private route if user is not loggin then he will not be able to show place order page */}
      <Route path='/order/:id' element={<OrderScreen/>} /> 
      <Route path='/profile' element={<ProfileScreen />} />
  </Route>

  <Route path='' element={<AdminRoute />}> 
      <Route path='/admin/orderlist' element={<OrderListScreen />} />
      <Route path='/admin/productlist' element={<ProductListScreen />} />
      <Route path='/admin/productlist/page/:pageNumber' element={<ProductListScreen />} />
      <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
      <Route path='/admin/userlist' element={<UserListScreen />} />
      <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
  </Route>

</Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store} >
    <PayPalScriptProvider deferLoading={true}>
    <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
