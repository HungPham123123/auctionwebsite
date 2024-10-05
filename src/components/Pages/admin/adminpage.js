import { Link, Outlet } from "react-router-dom";
import './AdminPage.css';

function AdminPage() {
    return (
        <div className="container-fluid admin-container">
            <div className="row">
                {/* Sidebar */}
                <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <div className="position-sticky">
                        <h5 className="sidebar-heading text-center mt-3">Admin Menu</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link" to="accepting-auction">
                                    Accept Auction
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="auctions">
                                    Auctions
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="bids">
                                    Bids
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="auction-history">
                                    Auction History
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="notification">
                                    Notifications
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="category">
                                    Categories
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="payment">
                                    Payments
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="roles">
                                    Roles
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="user">
                                    Users
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Outlet for rendering admin components */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-3">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminPage;
