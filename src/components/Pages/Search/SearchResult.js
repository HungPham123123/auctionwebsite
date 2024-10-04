import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "../../../utils/axios";
import moment from "moment"; // Import moment.js

const SearchResult = () => {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = new URLSearchParams(useLocation().search).get("query");
    const [timers, setTimers] = useState({});
    const interval = useRef(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`/api/Admin/auctions`);
                setResults(response.data.$values || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching auctions:", error);
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    useEffect(() => {
        console.log("Query:", query);
        if (query) {
            const filtered = results.filter(auction => {
                const endTime = moment.utc(auction.endTime); 
                const hasEnded = auction.auctionStatus === 'Ended';
                
                // Exclude auctions that ended more than 24 hours ago
                if (hasEnded && moment().diff(endTime, 'hours') > 24) {
                    return false; // Exclude this auction
                }

                return auction.itemTitle && auction.itemTitle.toLowerCase().includes(query.toLowerCase());
            });

            setFilteredResults(filtered);
        } else {
            setFilteredResults(results);
        }
    }, [query, results]);

    useEffect(() => {
        startTimers();

        return () => clearInterval(interval.current);
    }, [filteredResults]);

    const calculateTimeLeft = (endTime) => {
        const currentTime = new Date();
        const endAuctionTime = new Date(endTime);
        const remainingTime = endAuctionTime - currentTime;

        if (remainingTime <= 0) {
            return null; // Auction has ended
        }

        return {
            days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
            hours: Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((remainingTime % (1000 * 60)) / 1000),
        };
    };

    const startTimers = () => {
        interval.current = setInterval(() => {
            const newTimers = {};
            filteredResults.forEach(auction => {
                const timeLeft = calculateTimeLeft(auction.endTime);
                if (timeLeft) {
                    newTimers[auction.auctionID] = timeLeft;
                } else {
                    newTimers[auction.auctionID] = null; // Auction has ended
                }
            });
            setTimers(newTimers);
        }, 1000);
    };

    if (loading) return <div>Loading...</div>;


    return (
        <div className="container mt-5" style={{ maxWidth: '1440px' }}>
            <h1>Search Results for: {query}</h1>
            <div className="text-center mt-4 mb-4" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found for "{query}"
            </div>
            <div className="row mt-5">
                {filteredResults.length > 0 ? (
                    filteredResults.map(auction => {
                        const isEnded = timers[auction.auctionID] === null;
                        const timer = timers[auction.auctionID] || {};

                        return (
                            <div className="auction-items auction-smaller-item col-md-4" key={auction.auctionID} style={{ width: "440px!important" }}>
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
                                        <div className="space-between">
                                            <div className="auction-category">
                                                <p>{auction.categoryName}</p>
                                            </div>
                                            <div className="auction-price">
                                                <p>Starting Bid: {auction.itemStartingPrice}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                ) : (
                    <li>No results found.</li>
                )}
            </div>
        </div>
    );
};

export default SearchResult;
