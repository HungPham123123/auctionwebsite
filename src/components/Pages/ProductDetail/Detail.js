import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Detail.css';
import axios from '../../../utils/axios';

const Detail = () => {
    const { auctionID } = useParams();
    const [auctionDetails, setAuctionDetails] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [bidAmount, setBidAmount] = useState('');
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const [isMoreInfoVisible, setIsMoreInfoVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

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
        const value = e.target.value.replace(/[^0-9]/g, '');
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

    useEffect(() => {
        if (auctionDetails && auctionDetails.item) {
            setMainImage(auctionDetails.item.imageUrl);
        }
    }, [auctionDetails]);

    useEffect(() => {
        const fetchAuctionDetails = async () => {
            try {
                const response = await axios.get(`/api/Auction/${auctionID}`);
                console.log(response.data)
                setAuctionDetails(response.data);
            } catch (error) {
                console.error('Error fetching auction details:', error);
            }
        };

        fetchAuctionDetails();
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

    const calculateRemainingTime = () => {
        const endDate = new Date(auctionDetails?.endTime);
        const now = new Date();
        const remainingTime = endDate - now;
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${days} day${days !== 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''}`;
    };

    const sortedAuctionHistories = auctionDetails?.auctionHistories?.$values?.slice().sort((a, b) => b.bidAmount - a.bidAmount) || [];

    return (
        <div className="container container-detail">
            <div className="row">
                <div className="col-md-1">
                    <div className="d-flex flex-column">
                        <img
                            src={auctionDetails?.item?.imageUrl}
                            alt={auctionDetails?.item?.imageUrl}
                            className="img-thumbnail mb-2"
                            onClick={() => changeMainImage('images/productimage1.jpg')}
                        />
                        <img
                            src={auctionDetails?.item?.imageUrl1}
                            alt={auctionDetails?.item?.imageUrl1}
                            className="img-thumbnail mb-2"
                            onClick={() => changeMainImage('images/productimage7.jpg')}
                        />
                        <img
                            src={auctionDetails?.item?.imageUrl2}
                            alt={auctionDetails?.item?.imageUrl2}
                            className="img-thumbnail mb-2"
                            onClick={() => changeMainImage('images/book-1.jpg')}
                        />
                    </div>
                </div>

                <div className="col-md-7">
                    <img className="img-fluid main-image" src={mainImage} alt="Main" />

                    <div className="product-description mb-3">
                        <p>Description</p>
                        <p>{auctionDetails?.item.description}</p>
                        {isMoreInfoVisible && (
                            <div>
                                <p><strong>General Introduction:</strong> This is an antique painting from the 18th century, crafted using oil on canvas.</p>
                                <p><strong>Condition:</strong> Excellent, well-preserved.</p>
                                <p><strong>Provenance:</strong> From a private collection in France.</p>
                                <p><strong>Author Bio:</strong> 18th-century renowned artist.</p>
                            </div>
                        )}
                        <p>
                            <a
                                href="#"
                                className="toggle-more-info"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleMoreInfo();
                                }}
                            >
                                {isMoreInfoVisible ? '...Show less' : '...Show more'}
                            </a>
                        </p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="product-info">
                        <div className="product-title mb-3">
                            <p className="text-muted" style={{ fontWeight: '500' }}>{new Date(auctionDetails?.startTime).toLocaleString()}</p>
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
                            <h3 className="mb-0">${auctionDetails?.currentBid?.bidAmount}</h3>
                            <span className="end-time text-danger">{calculateRemainingTime()}</span>
                        </div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Place your bid"
                                value={bidAmount}
                                onChange={handleBidInputChange}
                            />
                            <button className="btn btn-primary">Place Bid</button>
                        </div>
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
              <p className="text-muted">{auctionDetails?.item?.user?.address}</p>
            </div>
                </div>
            </div>

            {isModalVisible && (
                <div className="modal" ref={modalRef}>
                    <div className="modal-content">
                        <span className="close" onClick={hideBidderHistory}>&times;</span>
                        <h4>Bidding History</h4>
                        <ul>
                            {sortedAuctionHistories.map((history) => (
                                <li key={history.auctionHistoryID}>
                                    Bid Amount: ${history.bidAmount} at {new Date(history.timestamp).toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;
