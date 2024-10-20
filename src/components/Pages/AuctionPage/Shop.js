import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../utils/axios";
import moment from "moment"; // For easier time manipulation
import './shop.css'; // Add your CSS file for custom styling if needed

function Shop() {
    const [auctions, setAuctions] = useState([]); // State to hold auction data
    const [filteredAuctions, setFilteredAuctions] = useState([]); // State for filtered auctions
    const [timers, setTimers] = useState({}); // State to hold timers for each auction
    const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories
    const [sortBy, setSortBy] = useState(''); // State for sorting
    const interval = useRef();

    const fetchAuctions = async () => {
        try {
            const response = await axios.get('/api/Auction/all');
            const auctionData = response.data.$values || [];
            const now = moment(); // Use local time
    
            // Filter auctions: only include Active auctions
            const filteredData = auctionData.filter(auction => {
                const endTime = moment(auction.endTime); // No UTC conversion
                const isActive = auction.auctionStatus === 'Active';
                const hasEnded = auction.auctionStatus === 'Ended';
    
                // Only return active auctions; exclude ended auctions
                return isActive && now.isBefore(endTime);
            });
    
            setAuctions(filteredData);
        } catch (error) {
            console.error("Error fetching auctions:", error);
        }
    };
    
    

    const calculateTimeLeft = (endTime) => {
        const now = moment(); // Use local time
        const end = moment(endTime); // No UTC conversion
        const duration = moment.duration(end.diff(now));

        if (duration.asSeconds() <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
        }

        return {
            days: Math.floor(duration.asDays()),
            hours: Math.floor(duration.hours()),
            minutes: Math.floor(duration.minutes()),
            seconds: Math.floor(duration.seconds()),
            ended: false
        };
    };

    const startTimers = () => {
        interval.current = setInterval(() => {
            const newTimers = {};
            filteredAuctions.forEach(auction => {
                newTimers[auction.auctionID] = calculateTimeLeft(auction.endTime);
            });
            setTimers(newTimers);
        }, 1000);
    };

    const filterAndSortAuctions = () => {
        let tempAuctions = [...auctions]; // Start with the full list of auctions

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            tempAuctions = tempAuctions.filter(auction => selectedCategories.includes(auction.categoryName));
        }

        // Sort auctions based on selected option
        if (sortBy === 'priceHighToLow') {
            tempAuctions.sort((a, b) => b.itemStartingPrice - a.itemStartingPrice);
        } else if (sortBy === 'priceLowToHigh') {
            tempAuctions.sort((a, b) => a.itemStartingPrice - b.itemStartingPrice);
        } else if (sortBy === 'newest') {
            tempAuctions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'endingSoon') {
            tempAuctions.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));
        }

        return tempAuctions; // Return the filtered and sorted auctions
    };

    useEffect(() => {
        fetchAuctions();
    }, []); // Run once on mount

    // Update filtered auctions whenever auctions or filters change
    useEffect(() => {
        const result = filterAndSortAuctions();
        setFilteredAuctions(result);
    }, [auctions, selectedCategories, sortBy]); // Dependencies to trigger the effect

    useEffect(() => {
        if (filteredAuctions.length > 0) {
            startTimers();
        }

        return () => {
            clearInterval(interval.current); // Cleanup on unmount
        };
    }, [filteredAuctions]);

    const handleCheckboxChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(item => item !== category)); // Remove category
        } else {
            setSelectedCategories([...selectedCategories, category]); // Add category
        }
    };

    return (
        <div className="row container-Shop">
            {/* Filter Sidebar */}
            <div className="col-md-3">
                <div className="filter-sidebar">
                    <h4>Filters</h4>
                    <div className="filter-option mb-3">
                        <h5>Sort By</h5>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="form-select">
                            <option value="">Default</option>
                            <option value="priceLowToHigh">Price: Low to High</option>
                            <option value="priceHighToLow">Price: High to Low</option>
                            <option value="newest">Newest Auctions</option>
                            <option value="endingSoon">Ending Soon</option>
                        </select>
                    </div>
                    <div className="filter-option">
                        <h5>Category</h5>
                        <div className="checkbox-group">
                            <div>
                                <input
                                    type="checkbox"
                                    id="category-all"
                                    checked={selectedCategories.length === 0}
                                    onChange={() => setSelectedCategories([])} // Clear selection
                                />
                                <label htmlFor="category-all">All Categories</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="category-art"
                                    checked={selectedCategories.includes('Art')}
                                    onChange={() => handleCheckboxChange('Art')}
                                />
                                <label htmlFor="category-art">Art</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="category-collectibles"
                                    checked={selectedCategories.includes('Collectibles')}
                                    onChange={() => handleCheckboxChange('Collectibles')}
                                />
                                <label htmlFor="category-collectibles">Collectibles</label>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    id="category-antiques"
                                    checked={selectedCategories.includes('Antiques')}
                                    onChange={() => handleCheckboxChange('Antiques')}
                                />
                                <label htmlFor="category-antiques">Antiques</label>
                            </div>
                            {/* Add more categories dynamically or statically as needed */}
                        </div>
                    </div>

                </div>
            </div>

            {/* Auctions Section */}
            <div className="col-md-9">
                <div className="row">
                    {filteredAuctions.map(auction => {
                        const timer = timers[auction.auctionID] || { days: 0, hours: 0, minutes: 0, seconds: 0, ended: false };
                        const isEnded = timer.ended;

                        return (
                            <div className="auction-items auction-smaller-item col-md-4" key={auction.auctionID} style={{width: "440px!important"}}>
                                <div className="auction-image small-img-auction">
                                    <Link to={`/auction/detail/${auction.auctionID}`}>
                                        <img src={auction.itemImage} alt={auction.itemTitle} />
                                    </Link>
                                    <div className="auction-time">
                                        <div className="auction-time-items">
                                            <div className="countdown-box">
                                                {!isEnded ? (
                                                    <span className="countdown-time">
                                                        {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                                                            <span key={unit} className="auction-timer">
                                                                <span>{String(timer[unit]).padStart(2, '0')}</span>
                                                                <span className="auction-date">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
                                                            </span>
                                                        ))}
                                                    </span>
                                                ) : (
                                                    <span className="ended-auction">Auction has ended</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {!isEnded && (
                                        <div className="bid-now-button">
                                            <button className="bid-button">
                                                <Link to={`/auction/detail/${auction.auctionID}`}>Bid Now</Link>
                                            </button>
                                        </div>
                                    )}
                                    <div className="favorite-button">
                                        <i className="fa-regular fa-heart"></i>
                                    </div>
                                </div>
                                <Link className="wrap-auction-detail" to={`/auction/detail/${auction.auctionID}`}>
                                    <div className="auction-name-price">
                                        <div className="auction-name">
                                            <span>{auction.itemTitle}</span>
                                        </div>
                                        <div className="auction-price">
                                            <span>${auction.itemStartingPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Shop;
