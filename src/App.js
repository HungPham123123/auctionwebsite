import React from 'react';
import { Route, Routes, HashRouter, Navigate } from 'react-router-dom';
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
import Payment from './components/payment/payment';
import Forgotpassword from './components/Pages/SignInSignUp/forgotpassword';
import Ressetpassword from './components/Pages/SignInSignUp/resstpassword';
import BalanceWithdraw from './components/Pages/user/BalanceWithdraw';
import UserPayment from './components/Pages/user/userPayment';
import AdminPage from './components/Pages/admin/adminpage';
import AdminAuction from './components/Pages/admin/auctions';
import AdminBids from './components/Pages/admin/bids';
import AdminAuctionHistory from './components/Pages/admin/auctionhistories';
import AdminNotifications from './components/Pages/admin/notifications';
import AdminCategory from './components/Pages/admin/categories';
import AdminPayments from './components/Pages/admin/payments';
import AdminRoles from './components/Pages/admin/roles';
import AdminUser from './components/Pages/admin/users';
import AdminLogin from './components/Pages/admin/adminlogin';
import UserCreatedAuction from './components/Pages/user/userCreatedAuction';
import AcceptRejectAuction from './components/Pages/admin/AcceptRejectAuction';
import SearchResult from './components/Pages/Search/SearchResult';

function App() {
  return (
    <HashRouter basename="/">
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user' element={<Userpage />}>
            <Route index element={<Navigate to="myprofile" />} /> 
            <Route path='myprofile' element={<Myprofile />} />
            <Route path='order-bidding' element={<Orderbidding />} />
            <Route path='user-purchase' element={<Userpurchase />} />
            <Route path='balance' element={<BalanceWithdraw />}/>
            <Route path='payment' element={<UserPayment />} />
            <Route path='my-auction' element={<UserCreatedAuction />}/>
          </Route>
          <Route path='/add-listing' element={<CreateProductForm />}/>
          <Route path="/auction/detail/:auctionID" element={<Detail />} />
          <Route path='/sign-in' element={<Signin/>}/>
          <Route path='/sign-up' element={<Signup/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path="/payment" element={<Payment/>} />
          <Route path='/forgot-password' element={<Forgotpassword/>}/>
          <Route path='/reset-password' element={<Ressetpassword/>}/>
          <Route path='/admin' element={<AdminPage />}>
            <Route index element={<Navigate to="auctions" />} /> 
            <Route path='auctions' element={<AdminAuction />}/>
            <Route path='bids' element={<AdminBids />}/>
            <Route path='auction-history' element={<AdminAuctionHistory />}/>
            <Route path='notification' element={<AdminNotifications />}/>
            <Route path='category' element={<AdminCategory />}/>
            <Route path='payment' element={<AdminPayments />}/>
            <Route path='roles' element={<AdminRoles />}/>
            <Route path='user' element={<AdminUser />}/>
            <Route path='accepting-auction' element={<AcceptRejectAuction />}/>
          </Route>
          <Route path='/admin/login' element={<AdminLogin />}/>
          <Route path='/search' element={<SearchResult />}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}

export default App;
