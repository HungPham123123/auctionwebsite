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

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user' element={<Userpage />}>
            <Route index element={<Navigate to="myprofile" />} /> {/* Redirect to MyProfile by default */}
            <Route path='myprofile' element={<Myprofile />} />
            <Route path='order-bidding' element={<Orderbidding />} />
            <Route path='user-purchase' element={<Userpurchase />} />
            {/* Add more routes as needed */}
          </Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
