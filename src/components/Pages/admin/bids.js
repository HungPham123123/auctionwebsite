import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Button } from 'react-bootstrap'; // Import Bootstrap Button

function AdminBids() {
    const [bids, setBids] = useState([]); // State to store bids
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const itemsPerPage = 12; // Number of items per page

    useEffect(() => {
        // Fetch bids from the API
        axios.get('/api/Admin/bids')
            .then(response => {
                console.log(response.data);
                setBids(response.data.$values); // Set bids in state from $values
                setLoading(false); // Stop loading
            })
            .catch(error => {
                setError(error.response ? error.response.data : 'Error fetching bids'); // Handle error
                setLoading(false); // Stop loading
            });
    }, []); // Empty dependency array means this will run once when component mounts

    // Pagination Logic
    const totalPages = Math.ceil(bids.length / itemsPerPage); // Calculate total pages
    const indexOfLastItem = currentPage * itemsPerPage; // Index of the last item on the current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Index of the first item on the current page
    const currentItems = bids.slice(indexOfFirstItem, indexOfLastItem); // Get the items for the current page

    const handleEdit = (bidId) => {
        // Logic for editing the bid
        console.log(`Edit bid with ID: ${bidId}`);
    };

    const handleDelete = (bidId) => {
        // Logic for deleting the bid
        console.log(`Delete bid with ID: ${bidId}`);
    };

    const handleCreateBid = () => {
        // Logic for creating a new bid
        console.log('Create new bid');
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Update the current page
    };

    // Pagination Control
    const renderPagination = () => {
        const pages = [];
        const pageLimit = 2; // Number of pages to show on either side of the current page

        // First page
        if (totalPages > 0) {
            pages.push(1);
        }

        // Ellipsis and pages before current page
        for (let i = Math.max(2, currentPage - pageLimit); i < currentPage; i++) {
            pages.push(i);
        }

        // Current page
        if (currentPage > 1 && currentPage < totalPages) {
            pages.push(currentPage);
        }

        // Ellipsis and pages after current page
        for (let i = currentPage + 1; i <= Math.min(totalPages - 1, currentPage + pageLimit); i++) {
            pages.push(i);
        }

        // Last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        // Generate pagination elements
        return (
            <nav>
                <ul className="pagination">
                    {pages.map((page, index) => (
                        <li
                            className={`page-item ${page === currentPage ? 'active' : ''}`}
                            key={index}
                        >
                            {page === '...' ? (
                                <span className="page-link">...</span>
                            ) : (
                                <button className="page-link" onClick={() => handlePageChange(page)}>
                                    {page}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    if (loading) {
        return <div>Loading bids...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Bids List</h1>
            {currentItems.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Bid ID</th>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Auction ID</th>
                            <th>Bid Amount</th>
                            <th>Bid Time</th>
                            <th>Is Winning Bid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(bid => (
                            <tr key={bid.bidID}>
                                <td>{bid.bidID}</td>
                                <td>{bid.userID}</td>
                                <td>{bid.userName}</td>
                                <td>{bid.auctionID}</td>
                                <td>{bid.bidAmount}</td>
                                <td>{new Date(bid.bidTime).toLocaleString()}</td> {/* Format bid time */}
                                <td>{bid.isWinningBid ? 'Yes' : 'No'}</td> {/* Display winning bid status */}
                                <td>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No bids found.</p>
            )}
            {/* Render Pagination Controls */}
            {renderPagination()}
        </div>
    );
}

export default AdminBids;
