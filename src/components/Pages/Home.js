import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import PromoVideo from "./Video/PromoVideo";
import './home.css';
import axios from "../../utils/axios";
import moment from 'moment';

function Home() {
    const [auctions, setAuctions] = useState([]);
    const [highestBidAuctions, setHighestBidAuctions] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const navigate = useNavigate(); // Use useNavigate for navigation

    // Existing code for fetching auctions and calculating timers...

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Navigate to the search results page with the search term
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div>
            <div className="home-video-container">
                <video autoPlay loop muted playsInline>
                    <source src="video/video1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="overlay">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1 className="title-homepage">Join Our Next Auction! Find<br /> Your Equipment</h1>
                                <div className="search-box">
                                    <form onSubmit={handleSearchSubmit}>
                                        <div className="input-group">
                                            <ul className="home-inline-list">
                                                <li className="product-name">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="I'm Looking for..."
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                </li>
                                                <li className="btn-search">
                                                    <div>
                                                        <input type="submit" className="button" value="Search" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>
                                </div>
                                <div className="video-promo mt-4">
                                    <button className="red-button">
                                        <i className="fa-solid fa-play"></i>
                                        <span>We are running our summer discount<br />Watch video to learn more</span>
                                        <div className="playvideo-animation"></div>
                                        <div className="playvideo-animation-1"></div>
                                        <div className="playvideo-animation-2"></div>
                                    </button>
                                </div>
                                <PromoVideo videoSrc="https://www.youtube.com/embed/your-video-id" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="social-panel-button">
                <Link className="social-panel-button-button">
                    <i className="fa-brands fa-facebook"></i>
                    <span className="social-panel-button-desc">View Facebook</span>
                </Link>
                <Link className="social-panel-button-button">
                    <i className="fa-brands fa-twitter"></i>
                    <span className="social-panel-button-desc">View Twitter</span>
                </Link>
                <Link className="social-panel-button-button">
                    <i className="fa-brands fa-instagram"></i>
                    <span className="social-panel-button-desc">View Instagram</span>
                </Link>
            </div>
        </div>
    );
}

export default Home;
