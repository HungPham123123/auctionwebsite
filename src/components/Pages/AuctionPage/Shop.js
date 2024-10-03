import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../utils/axios";
import moment from "moment"; // For easier time manipulation

function Shop() {
    const [auctions, setAuctions] = useState([]); // State to hold auction data
    const [timers, setTimers] = useState({}); // State to hold timers for each auction
    const interval = useRef();

    const fetchAuctions = async () => {
        try {
            const response = await axios.get('/api/Auction/all');
            const auctionData = response.data.$values || [];
            const now = moment.utc(); // Use UTC time
            console.log(response.data)

            // Filter auctions: only include Active or those ended within the last 24 hours
            const filteredAuctions = auctionData.filter(auction => {
                const endTime = moment.utc(auction.endTime); // Ensure endTime is in UTC
                const hasEnded = auction.auctionStatus === 'Ended';
                const isActive = auction.auctionStatus === 'Active';
                const endedRecently = hasEnded && now.diff(endTime, 'hours') <= 24;

                return isActive || endedRecently;
            });

            setAuctions(filteredAuctions);
        } catch (error) {
            console.error("Error fetching auctions:", error);
        }
    };

    const calculateTimeLeft = (endTime) => {
        const now = moment.utc(); // Use UTC time
        const end = moment.utc(endTime); // Ensure endTime is in UTC
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
            auctions.forEach(auction => {
                newTimers[auction.auctionID] = calculateTimeLeft(auction.endTime);
            });
            setTimers(newTimers);
        }, 1000);
    };

    useEffect(() => {
        fetchAuctions();
    }, []); // Run once on mount

    useEffect(() => {
        if (auctions.length > 0) {
            startTimers();
        }

        return () => {
            clearInterval(interval.current); // Cleanup on unmount
        };
    }, [auctions]);

    return (
        <div className="container">
            <div className="row">
                {auctions.map(auction => {
                    const timer = timers[auction.auctionID] || { days: 0, hours: 0, minutes: 0, seconds: 0, ended: false };
                    const isEnded = timer.ended;

                    return (
                        <div className="auction-items" key={auction.auctionID}>
                            <div className="auction-image small-img-auction">
                                <Link to={`/auction/detail/${auction.auctionID}`}>
                                    <img src={auction.itemImage} alt={auction.itemTitle} />
                                </Link>
                                <div className="auction-time">
                                    <div className="auction-time-items">
                                        <div className="countdown-box">
                                            {!isEnded ? (
                                                <span className="countdown-time">
                                                    {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
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
                })}
            </div>
        </div>
    );
}

export default Shop;
