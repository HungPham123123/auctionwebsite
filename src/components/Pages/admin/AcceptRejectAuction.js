import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import './AcceptRejectAuction.css'; // Import the CSS file

function AcceptRejectAuction() {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get(`/api/Admin/auctions`);
                const data = response.data;

                // Accessing the auction data inside $values
                const pendingAuctions = data.$values.filter(auction => auction.auctionStatus === 'Pending');
                setAuctions(pendingAuctions);
            } catch (error) {
                console.error('Error fetching auction data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuctions();
    }, []);

    const handleAccept = async (auctionID) => {
        try {
            await axios.put(`/api/Auction/accept/${auctionID}`);
            alert('Auction accepted successfully');
            setAuctions(prevAuctions => prevAuctions.filter(auction => auction.auctionID !== auctionID));
        } catch (error) {
            console.error('Error accepting auction:', error);
            alert('Failed to accept auction');
        }
    };

    const handleReject = async (auctionID) => {
        try {
            await axios.put(`/api/Auction/reject/${auctionID}`);
            alert('Auction rejected successfully');
            setAuctions(prevAuctions => prevAuctions.filter(auction => auction.auctionID !== auctionID));
        } catch (error) {
            console.error('Error rejecting auction:', error);
            alert('Failed to reject auction');
        }
    };

    if (loading) {
        return <div>Loading auction details...</div>;
    }

    if (auctions.length === 0) {
        return <div className='mt-4'>No pending auctions available.</div>;
    }

    return (
        <div className='pending-container'>
            <h2>Pending Auctions</h2>
            <table className="auction-table">
                <thead>
                    <tr>
                        <th>Item Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Starting Price</th>
                        <th>Buy Now Price</th>
                        <th>Category</th>
                        <th>Condition</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {auctions.map((auction) => (
                        <tr key={auction.auctionID}>
                            <td><img src={auction.itemImage} alt={auction.itemTitle} className="auction-image" style={{maxWidth: "300px"}}/></td>
                            <td>{auction.itemTitle}</td>
                            <td>{auction.itemDescription}</td>
                            <td>${auction.itemStartingPrice}</td>
                            <td>${auction.buyNowPrice}</td>
                            <td>{auction.categoryName}</td>
                            <td>{auction.itemCondition}</td>
                            <td>{auction.auctionStatus}</td>
                            <td>
                                <button className="accept-button" onClick={() => handleAccept(auction.auctionID)}>Accept</button>
                                <button className="reject-button" onClick={() => handleReject(auction.auctionID)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AcceptRejectAuction;
