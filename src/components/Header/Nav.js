import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './nav.css';
import useAuthToken from '../../hooks/useAuthToken';

function Nav() {
    const location = useLocation();
    const isHomepage = location.pathname === '/';
    const [showNav, setShowNav] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const hasToken = useAuthToken();

    useEffect(() => {
        const handleScroll = () => {
            setShowNav(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleNotifications = () => {
        setShowNotifications(prevState => !prevState);
    };

    return (
        <header className={`nav-container ${showNav ? 'show' : ''} ${isHomepage ? 'homepage' : 'otherpage'}`}>
            <div className="logo-and-links">
                <Link className="logo-name" to="//">Fox Auction</Link>
                <Link className="nav-link-section" to="/shop">Shop</Link>
            </div>
            <nav className="nav-emoji-bar">
                {hasToken ? (
                    <>
                        <Link className="my-account-nav" to="/user">My Account</Link>
                        <Link className="contact-list" to="/add-listing">ADD LISTING</Link>
                        <div className="notification-container">
                            <button className="notification-button" onClick={toggleNotifications}>
                                <i className="fa fa-bell"></i>
                            </button>
                            {showNotifications && (
                                <div className="notification-dropdown">
                                    <ul>
                                        <li>No new notifications</li>
                                        {/* Add notifications dynamically here */}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <Link className="my-account-nav" to="/sign-in">Sign in</Link>
                )}
            </nav>
        </header>
    );
}

export default Nav;
