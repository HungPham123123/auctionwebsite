import React, { useEffect, useState } from 'react';
import './user-payment.css';
import axios from '../../../utils/axios';
import UserTable from 'react-bootstrap/Table';

function UserCreatedAuction() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch created auctions
    useEffect(() => {
        const fetchCreatedAuctions = async () => {
            try {
                const response = await axios.get('/api/Auction/created'); // Adjust the endpoint as per your backend
                console.log(response.data);
                setPayments(response.data.$values || []); // Assuming your data is in $values
            } catch (err) {
                setError('Failed to fetch created auctions. Please try again later.');
                console.error(err); // Log the error for debugging
            } finally {
                setLoading(false);
            }
        };

        fetchCreatedAuctions();
    }, []);

    // Sort payments to show the latest first
    const sortedPayments = payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt
    const totalPages = Math.ceil(sortedPayments.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedPayments.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="user-payment-container mt-4">
            <h2 className="user-payment-title">My Created Auctions</h2>

            <UserTable striped bordered hover responsive className="align-middle">
                <thead className="thead-dark">
                    <tr>
                        <th>Auction ID</th>
                        <th>Item Title</th>
                        <th>Created At</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Winning Bid Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((auction) => (
                            <tr key={auction.auctionID}>
                                <td>{auction.auctionID}</td>
                                <td>{auction.itemTitle}</td>
                                <td>{new Date(auction.createdAt).toLocaleString()}</td>
                                <td>{new Date(auction.endTime).toLocaleString()}</td>
                                <td>{auction.auctionStatus}</td>
                                <td>{auction.winningBidAmount || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No auctions created yet.</td>
                        </tr>
                    )}
                </tbody>
            </UserTable>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, payments.length)} of {payments.length} entries
                </div>
                <div className='prev-next-container'>
                    <button 
                        className='previous-button' 
                        variant="secondary" 
                        onClick={() => handlePageChange('prev')} 
                        disabled={currentPage === 1}>
                        Prev
                    </button>
                    <span className="current-page mx-3">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button 
                        className='next-button' 
                        variant="secondary" 
                        onClick={() => handlePageChange('next')} 
                        disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserCreatedAuction;
