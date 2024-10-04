import React, { useState, useEffect } from 'react';
import UserTable from 'react-bootstrap/Table';
import './user-table.css';
import axios from '../../../utils/axios';

function Orderbidding() {
    const [auction, setAuction] = useState([]); // Initialize as an empty array
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await axios.get('/api/Auction/userbids');
                setAuction(response.data.$values || []); // Correctly set auction state from $values
            } catch (error) {
                setError(error.response ? error.response.data : 'Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchBids();
    }, []);

    // Calculate pagination
    const totalPages = Math.ceil(auction.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = auction.slice(indexOfFirstItem, indexOfLastItem); // Directly slice the auction array

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
        if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2 className='mb-5'>Order Bidding List</h2>
            <UserTable striped bordered hover responsive className="align-middle">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Bidding ID</th>
                        <th>Auction Name</th> {/* New Auction Name Column */}
                        <th>Bid Amount (USD)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={`${item.bidID}-${index}`}>
                            <td>
                                <img src={item.image} alt="Auction Item" width="50" height="50" />
                            </td>
                            <td>{item.bidID}</td>
                            <td>{item.auctionName}</td> {/* Display Auction Name */}
                            <td>{item.bidAmount.toFixed(2)}</td>
                            <td style={{ color: item.isWinningBid ? 'green' : 'red' }}>
                                {item.isWinningBid ? 'Approved' : 'Rejected'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </UserTable>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, auction.length)} of {auction.length} entries
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

export default Orderbidding;
