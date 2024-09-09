import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './userpage.css'

function Userpage() {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const [activeTab, setActiveTab] = useState(currentPath || 'myprofile');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
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
                                <h1 id="username">User Name</h1>
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
                            <a href="#">Log Out</a>
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
                                        Order Bidding
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
                                        Purchase
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
