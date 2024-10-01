import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Home from './components/Pages/Home';
import Userpage from './components/Pages/Userpage';
import Myprofile from './components/Pages/user/myprofile';
import Orderbidding from './components/Pages/user/orderbidding';
import Userpurchase from './components/Pages/user/userpurchase';
import './App.css';
import Nav from './components/Header/Nav';
import Footer from './components/Footer/Footer';
import Signin from './components/Pages/SignInSignUp/Signin';
import CreateProductForm from './components/Pages/CreateAuction/CreateAuctionForm';
import Detail from './components/Pages/ProductDetail/Detail';
import Signup from './components/Pages/SignInSignUp/Signup';
import Shop from './components/Pages/AuctionPage/Shop';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user' element={<Userpage />}>
            <Route index element={<Navigate to="myprofile" />} /> 
            <Route path='myprofile' element={<Myprofile />} />
            <Route path='order-bidding' element={<Orderbidding />} />
            <Route path='user-purchase' element={<Userpurchase />} />
          </Route>
          <Route path='/add-listing' element={<CreateProductForm />}/>
          <Route path="/auction/detail/:auctionID" element={<Detail />} />
          <Route path='/sign-in' element={<Signin/>}/>
          <Route path='/sign-up' element={<Signup/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
