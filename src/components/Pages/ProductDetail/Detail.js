import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';
import axios from '../../../utils/axios';
import moment from 'moment';

const Detail = () => {
    const { auctionID } = useParams();
    const [auctionDetails, setAuctionDetails] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const [isMoreInfoVisible, setIsMoreInfoVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [remainingTime, setRemainingTime] = useState({});
    const modalRef = useRef(null);

    const toggleDescription = useCallback(() => {
        setIsDescriptionVisible(prev => !prev);
    }, []);

    const toggleMoreInfo = useCallback(() => {
        setIsMoreInfoVisible(prev => !prev);
    }, []);

    const changeMainImage = useCallback((imageUrl) => {
        setMainImage(imageUrl);
    }, []);

    const handleBidInputChange = useCallback((e) => {
        const value = e.target.value.replace(/[^0-9.]/g, ''); // Allow decimal input for bids
        setBidAmount(value);
    }, []);

    const showBidderHistory = () => {
        setIsModalVisible(true);
    };

    const hideBidderHistory = () => {
        setIsModalVisible(false);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            hideBidderHistory();
        }
    };

    // Fetch auction details
    const fetchAuctionDetails = async () => {
        try {
            const response = await axios.get(`/api/Auction/${auctionID}`);
            setAuctionDetails(response.data);
            if (response.data.item) {
                setMainImage(response.data.item.imageUrl);
            }
        } catch (error) {
            console.error('Error fetching auction details:', error);
        }
    };

    useEffect(() => {
        fetchAuctionDetails(); // Initial fetch
    }, [auctionID]);

    // Polling for updates every 5 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchAuctionDetails(); // Re-fetch auction details to keep updated
        }, 5000); // Every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [auctionID]);

    useEffect(() => {
        if (isModalVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalVisible]);

    const calculateRemainingTime = (endTime) => {
        const now = moment.utc(); // Current time in UTC
        const end = moment.utc(endTime); // End time in UTC
        const duration = moment.duration(end.diff(now));

        if (duration.asSeconds() <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
        }

        return {
            days: Math.floor(duration.asDays()),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
            ended: false,
        };
    };

    useEffect(() => {
        if (!auctionDetails) return;

        const updateRemainingTime = () => {
            const timeLeft = calculateRemainingTime(auctionDetails.endTime);
            setRemainingTime(timeLeft);
        };

        updateRemainingTime(); // Set initial time

        const intervalId = setInterval(updateRemainingTime, 1000); // Update every second

        return () => clearInterval(intervalId); // Clear interval on unmount
    }, [auctionDetails]);

    const sortedAuctionHistories = auctionDetails?.auctionHistories?.$values?.slice().sort((a, b) => b.bidAmount - a.bidAmount) || [];

    // Function to place a bid
    const placeBid = async () => {
        if (!bidAmount || parseFloat(bidAmount) <= 0) {
            alert("Please enter a valid bid amount.");
            return;
        }

        const bidData = {
            auctionID: auctionDetails?.auctionID,
            bidAmount: parseFloat(bidAmount),
            bidTime: new Date().toISOString(),
        };

        try {
            const response = await axios.post('/api/Bid', bidData);
            // Update the auction details to reflect the new bid
            setAuctionDetails(prevDetails => ({
                ...prevDetails,
                currentBid: {
                    bidAmount: bidData.bidAmount,
                    bidderUsername: response.data.bidderUsername
                },
                bids: Array.isArray(prevDetails?.bids) 
                    ? [...prevDetails.bids, response.data] 
                    : [response.data]
            }));
            setBidAmount(''); // Clear the bid input after a successful bid
        } catch (error) {
            console.error('Error placing bid:', error);
            alert("Failed to place the bid. Please try again.");
        }
    };

    return (
        <div className="container container-detail">
            <div className="row">
                <div className="col-md-1">
                    <div className="d-flex flex-column">
                        {auctionDetails?.item?.imageUrl && (
                            <img
                                src={auctionDetails.item.imageUrl}
                                alt={auctionDetails.item.title}
                                className="img-thumbnail mb-2"
                                onClick={() => changeMainImage(auctionDetails.item.imageUrl)}
                            />
                        )}
                        {auctionDetails?.item?.imageUrl1 && (
                            <img
                                src={auctionDetails.item.imageUrl1}
                                alt={auctionDetails.item.title}
                                className="img-thumbnail mb-2"
                                onClick={() => changeMainImage(auctionDetails.item.imageUrl1)}
                            />
                        )}
                        {auctionDetails?.item?.imageUrl2 && (
                            <img
                                src={auctionDetails.item.imageUrl2}
                                alt={auctionDetails.item.title}
                                className="img-thumbnail mb-2"
                                onClick={() => changeMainImage(auctionDetails.item.imageUrl2)}
                            />
                        )}
                    </div>
                </div>

                <div className="col-md-7">
                    <div className='main-image-wrapper'>
                    <img className="main-image" src={mainImage} alt="Main" />
                    </div>
                    <div className="product-description mb-1">
                        <p>Description</p>
                        <p>{auctionDetails?.item.description}</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="product-info">
                        <div className="product-title mb-3">
                            <p className="text-muted" style={{ fontWeight: '500' }}>{new Date(auctionDetails?.startTime).toUTCString()}</p>
                            <h2>{auctionDetails?.item.title}</h2>
                        </div>
                        <div className="product-bid mb-3 d-flex justify-content-between align-items-center">
                            <div>
                                <p className="mb-0">
                                    Leading bid |
                                    <span
                                        className="bidder-count"
                                        style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}
                                        onClick={showBidderHistory}
                                    >
                                        {auctionDetails?.bids.length} Bidders
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p className="mb-0">Ends in</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="mb-0">
                                ${auctionDetails?.currentBid?.bidAmount !== null && auctionDetails?.currentBid?.bidAmount !== undefined
                                    ? auctionDetails.currentBid.bidAmount
                                    : auctionDetails?.item?.startingPrice}
                            </h3>
                            {remainingTime.ended ? (
                                <span className="ended-auction">Auction has ended</span>
                            ) : (
                                <span className="end-time text-danger d-flex align-items-center">
                                    {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                                        <span key={unit} className="auction-timer d-flex flex-column align-items-center mx-2">
                                            <span className="timer-value">{String(remainingTime[unit]).padStart(2, '0')}</span>
                                            <span className="auction-date">{unit}</span>
                                        </span>
                                    ))}
                                </span>
                            )}
                        </div>

                        <div className="form-group d-flex align-items-center mb-3">
                            <label htmlFor="bidAmount" className="sr-only">Bid Amount</label>
                            <input
                                type="text"
                                id="bidAmount"
                                value={bidAmount}
                                className="form-control mr-2"
                                placeholder="Your bid"
                                onChange={handleBidInputChange}
                                style={{ flex: 1 }}
                            />
                            <button
                                type="button"
                                className="detail-bid-button"
                                onClick={placeBid}
                                disabled={!bidAmount}
                            >
                                Bid
                            </button>
                        </div>
                        <div className="seller-info">
                        <hr className="custom-line" />
                        <div className="product-bid mb-3 d-flex justify-content-between align-items-center">
                            <div>
                                <p><strong>{auctionDetails?.item?.user?.username}</strong></p>
                            </div>
                            <div>
                                <p>
                                    <span className="text-black" style={{ marginRight: '10px' }}>
                                        <i className="bi bi-star-fill"></i>
                                    </span>
                                    <span style={{ marginRight: '10px' }}>4.5</span>
                                    <img src="images/team-7-96x96.jpg" alt="Seller" style={{ width: '40px', height: '40px' }} />
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {isModalVisible && (
    <div className="modal-background">
        <div className="modal-contents" ref={modalRef}>
            <h4>Bid History</h4>
            <div className="scrollable-area mb-5">
                {sortedAuctionHistories.length > 0 ? (
                    <ul className=''>
                        {sortedAuctionHistories.map((history) => (
                            <li key={history.bidID} className='bidder-history'>
                                <strong>{history.bidderUsername}</strong> placed a bid of <strong>${history.bidAmount}</strong><br/>
                                Date: <strong>{history.timestamp}</strong>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bids yet.</p>
                )}
            </div>
            <div className="button-wrapper"> {/* New wrapper for the button */}
                <button className="close-bidder-history" onClick={hideBidderHistory}>
                    Close
                </button>
            </div>
        </div>
    </div>
)}
        </div>
    );
};

export default Detail;
