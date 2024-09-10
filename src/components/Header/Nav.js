import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './nav.css';

function Nav() {
    const location = useLocation();
    const isHomepage = location.pathname === '/';

    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setShowNav(true);
            } else {
                setShowNav(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`nav-container ${showNav ? 'show' : ''} ${isHomepage ? 'homepage' : 'otherpage'}`}>
            <div className="logo-and-links">
                <Link className="logo-name" to="/">Fox Auction</Link>
                <Link className="nav-link-section" to="/shop">Shop</Link>
            </div>
            <nav className="nav-emoji-bar">
                <Link className="my-account-nav" to="/user">My Account</Link>
                <Link className="contact-list" to="/add-listing">ADD LISTING</Link>
            </nav>
        </header>
    );
}

export default Nav;
