import React, { useEffect, useState } from 'react';
import UserTable from 'react-bootstrap/Table';
import './user-table.css';
import axios from '../../../utils/axios';

function Userpurchase() {
    const [wonAuctions, setWonAuctions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const itemsPerPage = 5; // Set items per page

    useEffect(() => {
        const fetchWonAuctions = async () => {
            try {
                const response = await axios.get('/api/Auction/won'); // Adjust the endpoint as per your backend
                setWonAuctions(response.data.$values || []); // Use empty array if $values is undefined
            } catch (err) {
                setError('Failed to fetch won auctions. Please try again later.');
                console.error(err); // Log the error for debugging
            } finally {
                setLoading(false);
            }
        };

        fetchWonAuctions();
    }, []);

    // Pagination logic
    const totalPages = Math.ceil(wonAuctions.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = wonAuctions.slice(indexOfFirstItem, indexOfLastItem); // Slice the wonAuctions array

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <div>
                <h2 className='mb-5'>Won Auctions</h2>
            </div>
            <UserTable striped bordered hover responsive className="align-middle">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Bidding ID</th>
                        <th>Winning Bid Amount (USD)</th>
                        <th>Status</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((auction) => (
                            <tr key={auction.auctionID}>
                                <td>
                                    <img src={auction.imageUrl} alt={auction.itemTitle} width={200} height={100} />
                                </td>
                                <td>{auction.auctionID}</td>
                                <td>{auction.winningBidAmount}</td>
                                <td>{auction.auctionStatus}</td>
                                <td>{new Date(auction.endTime).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No won auctions found.</td>
                        </tr>
                    )}
                </tbody>
            </UserTable>
            {/* Pagination controls */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, wonAuctions.length)} of {wonAuctions.length} entries
                </div>
                <div className='prev-next-container'>
                    <button className='previous-button' variant="secondary" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                        Prev
                    </button>
                    <span className="current-page mx-3">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button className='next-button' variant="secondary" onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Userpurchase;
