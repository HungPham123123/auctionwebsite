import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './userpage.css'
import { useAuth } from '../../contexts/AuthProvider';

function Userpage() {
    const { logout } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const [activeTab, setActiveTab] = useState(currentPath || 'myprofile');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        
        const errorMessage = await logout();
        if (errorMessage) {
            setError(errorMessage);
        } else {
            setError("");
            navigate('/');
        }
    };

    return (
        <div className="user-page">
            <div className="container container-user">
                <div className="user-box">
                    <div className="user-header">
                        <section>
                            <button className="user-image">
                                <img src="Shoes/IMAGES/IMAGES/defaultuserimg.jpg" alt="" />
                            </button>
                            <div className="user-header-content">
                                <h1 id="username"></h1>
                                <p id="member-since">Fox Auction Member Since (Created ACCOUNT)</p>
                            </div>
                        </section>
                    </div>
                    <div className="user-select-header">
                        <div className="selected-page">
                            <h3>
                                {activeTab === 'myprofile' ? 'My Profile' :
                                activeTab === 'orderbidding' ? 'Order Bidding' :
                                activeTab === 'purchase' ? 'Purchase' :
                                'Support'}
                            </h3>
                            <p className='logout-button' onClick={handleLogout}>Log Out</p>
                        </div>
                        <div className="Tab-Select">
                            <div className="nav-tab">
                                <span>
                                    <Link
                                        className={`nav-link ${activeTab === 'myprofile' ? 'selected' : ''}`}
                                        to="myprofile"
                                        onClick={() => handleTabClick('myprofile')}
                                    >
                                        My Profile
                                    </Link>
                                </span>
                            </div>
                            <div className="nav-tab">
                                <span>
                                    <Link
                                        className={`nav-link ${activeTab === 'orderbidding' ? 'selected' : ''}`}
                                        to="order-bidding"
                                        onClick={() => handleTabClick('orderbidding')}
                                    >
                                         Bidding List
                                    </Link>
                                </span>
                            </div>
                            <div className="nav-tab">
                                <span>
                                    <Link
                                        className={`nav-link ${activeTab === 'purchase' ? 'selected' : ''}`}
                                        to="user-purchase"
                                        onClick={() => handleTabClick('purchase')}
                                    >
                                        Won Auction
                                    </Link>
                                </span>
                            </div>
                            <div className="nav-tab">
                                <span>
                                    <Link
                                        className={`nav-link ${activeTab === 'my-auction' ? 'selected' : ''}`}
                                        to="my-auction"
                                        onClick={() => handleTabClick('my-auction')}
                                    >
                                        My Auction
                                    </Link>
                                </span>
                            </div>
                            <div className="nav-tab">
                                <span>
                                    <Link
                                        className={`nav-link ${activeTab === 'payment' ? 'selected' : ''}`}
                                        to="payment"
                                        onClick={() => handleTabClick('payment')}
                                    >
                                        My Payments
                                    </Link>
                                </span>
                            </div>
                            <div className="nav-tab">
                                <span>
                                    <Link
                                        className={`nav-link ${activeTab === 'balance' ? 'selected' : ''}`}
                                        to="balance"
                                        onClick={() => handleTabClick('balance')}
                                    >
                                        My Balance
                                    </Link>
                                </span>
                            </div>
                            
                        </div>
                        <div className="tab-content">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Userpage;
